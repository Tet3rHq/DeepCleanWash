from datetime import datetime
from database import db


class Service(db.Model):
    __tablename__ = "services"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=True)
    base_price = db.Column(db.Float, nullable=False, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "base_price": self.base_price,
            "created_at": self.created_at.isoformat()
        }


class Booking(db.Model):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    booking_reference = db.Column(db.String(50), unique=True, nullable=True)
    customer_name = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(30), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    service_type = db.Column(db.String(100), nullable=False)
    pickup_date = db.Column(db.String(50), nullable=False)
    pickup_time = db.Column(db.String(50), nullable=False)
    notes = db.Column(db.Text, nullable=True)
    estimated_price = db.Column(db.Float, nullable=False, default=0)
    status = db.Column(db.String(50), default="Pending")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    def to_dict(self):
        return {
            "id": self.id,
            "booking_reference": self.booking_reference,
            "customer_name": self.customer_name,
            "phone": self.phone,
            "location": self.location,
            "service_type": self.service_type,
            "pickup_date": self.pickup_date,
            "pickup_time": self.pickup_time,
            "notes": self.notes,
            "estimated_price": self.estimated_price,
            "status": self.status,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }


class AdminUser(db.Model):
    __tablename__ = "admin_users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)