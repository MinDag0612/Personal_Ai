from django.core.management.base import BaseCommand
from users.models import Users


class Command(BaseCommand):
    help = "Seed users data"

    def handle(self, *args, **kwargs):
        users = [
            {
                "email": "alex.nguyen@techflow.dev",
                "name": "Alex Nguyen",
                "avatar_url": "https://i.pravatar.cc/300?img=1",
                "password": "alex123",
                "auth_provider": "manual"
            },
            {
                "email": "emma.tran@creatify.io",
                "name": "Emma Tran",
                "avatar_url": "https://i.pravatar.cc/300?img=5",
                "password": "emma123",
                "auth_provider": "manual"
            },
            {
                "email": "ryan.le@buildspace.app",
                "name": "Ryan Le",
                "avatar_url": "https://i.pravatar.cc/300?img=8",
                "password": "ryan123",
                "auth_provider": "manual"
            },
            {
                "email": "lina.pham@designhub.co",
                "name": "Lina Pham",
                "avatar_url": "https://i.pravatar.cc/300?img=10",
                "password": "lina123",
                "auth_provider": "manual"
            },
            {
                "email": "daniel.vo@nextgen.ai",
                "name": "Daniel Vo",
                "avatar_url": "https://i.pravatar.cc/300?img=12",
                "password": "daniel123",
                "auth_provider": "manual"
            },
            {
                "email": "sophia.hoang@launchlab.dev",
                "name": "Sophia Hoang",
                "avatar_url": "https://i.pravatar.cc/300?img=15",
                "password": "sophia123",
                "auth_provider": "manual"
            }
        ]

        created_count = 0

        for user_data in users:
            _, created = Users.objects.get_or_create(
                email=user_data["email"],
                defaults=user_data
            )

            if created:
                created_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Seed complete - {created_count} users created"
            )
        )