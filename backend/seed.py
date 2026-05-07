from app import app
from database import db
from models import Service, AdminUser
from werkzeug.security import generate_password_hash

default_services = [
    {
        "name": "Laundry",
        "description": "Washing, drying and folding clothes.",
        "base_price": 300
    },
    {
        "name": "Ironing",
        "description": "Professional ironing service.",
        "base_price": 200
    },
    {
        "name": "Sofa Cleaning",
        "description": "Deep sofa cleaning and stain removal.",
        "base_price": 1500
    },
    {
        "name": "Deep Cleaning",
        "description": "Full home or office deep cleaning.",
        "base_price": 2500
    },
    {
        "name": "Pick & Wash",
        "description": "Laundry pickup and washing service.",
        "base_price": 500
    }
]

with app.app_context():
    for service_data in default_services:
        existing_service = Service.query.filter_by(
            name=service_data["name"]
        ).first()

        if not existing_service:
            service = Service(**service_data)
            db.session.add(service)

    existing_admin = AdminUser.query.filter_by(username="admin").first()

    if not existing_admin:
        admin = AdminUser(
            username="admin",
            password_hash=generate_password_hash("Paulina001")
        )
        db.session.add(admin)

    db.session.commit()
    print("Services and admin user seeded successfully.")
    print("Admin username: admin")
    print("Admin password: Paulina001")