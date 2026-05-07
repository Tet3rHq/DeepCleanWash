from flask import Blueprint, jsonify, request
from database import db
from models import Service

service_bp = Blueprint("service_bp", __name__)


@service_bp.route("/services", methods=["GET"])
def get_services():
    services = Service.query.order_by(Service.id.asc()).all()
    return jsonify([service.to_dict() for service in services]), 200


@service_bp.route("/services", methods=["POST"])
def create_service():
    data = request.get_json()

    name = data.get("name")
    description = data.get("description")
    base_price = data.get("base_price", 0)

    if not name:
        return jsonify({"error": "Service name is required"}), 400

    service = Service(
        name=name,
        description=description,
        base_price=base_price
    )

    db.session.add(service)
    db.session.commit()

    return jsonify(service.to_dict()), 201