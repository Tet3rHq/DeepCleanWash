from flask import Flask, jsonify
from flask_cors import CORS
from database import db
from routes.service_routes import service_bp
from routes.booking_routes import booking_bp
from routes.admin_routes import admin_bp
from models import Service, AdminUser
from werkzeug.security import generate_password_hash


def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///deepclean.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = "deep-clean-wash-production-secret-2026"

    CORS(app)

    db.init_app(app)

    app.register_blueprint(service_bp, url_prefix="/api")
    app.register_blueprint(booking_bp, url_prefix="/api")
    app.register_blueprint(admin_bp, url_prefix="/api")

    @app.route("/")
    def home():
        return jsonify({
            "message": "Deep Clean & Wash API is running"
        })

    with app.app_context():
        db.create_all()

        if Service.query.count() == 0:
            services = [
                Service(
                    name="Laundry Service",
                    description="Professional laundry cleaning and washing.",
                    base_price=800
                ),
                Service(
                    name="Sofa Cleaning",
                    description="Deep sofa and upholstery cleaning.",
                    base_price=2500
                ),
                Service(
                    name="Ironing Service",
                    description="Professional ironing and folding.",
                    base_price=500
                ),
                Service(
                    name="Deep Cleaning",
                    description="Full house and apartment deep cleaning.",
                    base_price=4500
                ),
            ]

            db.session.add_all(services)
            db.session.commit()

            existing_admin = AdminUser.query.filter_by(username="mitchello").first()
            
            if not existing_admin:
                admin = AdminUser(
                    username="mitchello",
                      password_hash=generate_password_hash("Mitchello@2026")
                 )
                
                db.session.add(admin)
                db.session.commit()

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)