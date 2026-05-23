from django.core.mail import send_mail
from django.conf import settings

class EmailService:
    @staticmethod
    def send_otp_email(email, otp):
        # print(settings.DEFAULT_FROM_EMAIL)
        subject = "Your OTP Code"
        message = f"Your OTP code is: {otp}"
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = [email]

        return send_mail(subject, message, from_email, recipient_list)
         