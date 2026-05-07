from routes.admin_routes import token_required
from flask import Blueprint, jsonify, request
from database import db
from models import Booking, Service

booking_bp = Blueprint("booking_bp", __name__)


def generate_booking_reference(booking_id):
    return f"DCW-{booking_id:05d}"


@booking_bp.route("/bookings", methods=["GET"])
@token_required
def get_bookings():
    search = request.args.get("search", "").strip()
    status = request.args.get("status", "").strip()

    query = Booking.query

    if search:
        query = query.filter(
            db.or_(
                Booking.customer_name.ilike(f"%{search}%"),
                Booking.phone.ilike(f"%{search}%"),
                Booking.location.ilike(f"%{search}%"),
                Booking.booking_reference.ilike(f"%{search}%"),
                Booking.service_type.ilike(f"%{search}%")
            )
        )

    if status and status != "All":
        query = query.filter_by(status=status)

    bookings = query.order_by(Booking.created_at.desc()).all()
    return jsonify([booking.to_dict() for booking in bookings]), 200


@booking_bp.route("/bookings/<int:booking_id>", methods=["GET"])
@token_required
def get_booking(booking_id):
    booking = Booking.query.get_or_404(booking_id)
    return jsonify(booking.to_dict()), 200


@booking_bp.route("/bookings", methods=["POST"])
def create_booking():
    data = request.get_json()

    required_fields = [
        "customer_name",
        "phone",
        "location",
        "service_type",
        "pickup_date",
        "pickup_time"
    ]

    for field in required_fields:
        if not data.get(field):
            return jsonify({"error": f"{field} is required"}), 400

    service = Service.query.filter_by(name=data["service_type"]).first()
    estimated_price = service.base_price if service else 0

    booking = Booking(
        customer_name=data["customer_name"],
        phone=data["phone"],
        location=data["location"],
        service_type=data["service_type"],
        pickup_date=data["pickup_date"],
        pickup_time=data["pickup_time"],
        notes=data.get("notes", ""),
        estimated_price=estimated_price,
        status="Pending"
    )

    db.session.add(booking)
    db.session.commit()

    booking.booking_reference = generate_booking_reference(booking.id)
    db.session.commit()

    return jsonify({
        "message": "Booking created successfully",
        "booking": booking.to_dict()
    }), 201


@booking_bp.route("/bookings/<int:booking_id>/status", methods=["PUT"])
@token_required
def update_booking_status(booking_id):
    booking = Booking.query.get_or_404(booking_id)
    data = request.get_json()

    new_status = data.get("status")

    allowed_statuses = [
        "Pending",
        "Confirmed",
        "Picked Up",
        "In Progress",
        "Completed",
        "Delivered",
        "Cancelled"
    ]

    if new_status not in allowed_statuses:
        return jsonify({"error": "Invalid booking status"}), 400

    booking.status = new_status
    db.session.commit()

    return jsonify({
        "message": "Booking status updated successfully",
        "booking": booking.to_dict()
    }), 200


@booking_bp.route("/bookings/<int:booking_id>", methods=["DELETE"])
@token_required
def delete_booking(booking_id):
    booking = Booking.query.get_or_404(booking_id)

    db.session.delete(booking)
    db.session.commit()

    return jsonify({"message": "Booking deleted successfully"}), 200