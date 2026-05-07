from functools import wraps
from datetime import datetime, timedelta

import jwt
from flask import Blueprint, jsonify, request, current_app
from werkzeug.security import generate_password_hash, check_password_hash

from database import db
from models import Booking, AdminUser

admin_bp = Blueprint("admin_bp", __name__)


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        auth_header = request.headers.get("Authorization")

        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]

        if not token:
            return jsonify({"error": "Token is missing"}), 401

        try:
            jwt.decode(
                token,
                current_app.config["SECRET_KEY"],
                algorithms=["HS256"]
            )
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401

        return f(*args, **kwargs)

    return decorated


@admin_bp.route("/admin/login", methods=["POST"])
def admin_login():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    admin = AdminUser.query.filter_by(username=username).first()

    if not admin or not check_password_hash(admin.password_hash, password):
        return jsonify({"error": "Invalid username or password"}), 401

    token = jwt.encode(
        {
            "admin_id": admin.id,
            "username": admin.username,
            "exp": datetime.utcnow() + timedelta(hours=8)
        },
        current_app.config["SECRET_KEY"],
        algorithm="HS256"
    )

    return jsonify({
        "message": "Login successful",
        "token": token
    }), 200


@admin_bp.route("/admin/stats", methods=["GET"])
@token_required
def get_admin_stats():
    total_bookings = Booking.query.count()
    pending_bookings = Booking.query.filter_by(status="Pending").count()
    completed_bookings = Booking.query.filter_by(status="Completed").count()
    cancelled_bookings = Booking.query.filter_by(status="Cancelled").count()

    return jsonify({
        "total_bookings": total_bookings,
        "pending_bookings": pending_bookings,
        "completed_bookings": completed_bookings,
        "cancelled_bookings": cancelled_bookings
    }), 200