from django.core.management.base import BaseCommand

from profiles.models import Profiles
from users.models import Users


class Command(BaseCommand):
    help = "Seed profiles data"

    def handle(self, *args, **kwargs):
        sample_profiles = [
            {
                "profession": "Software Developer",
                "education": "Computer Science",
                "hobbies": "Coding, reading, listening to music",
                "public_description": "A curious developer who enjoys building useful tools and learning new technologies.",
            },
            {
                "profession": "Product Designer",
                "education": "Interaction Design",
                "hobbies": "Sketching, photography, exploring cafes",
                "public_description": "A creative person who likes simple interfaces, thoughtful details, and clear ideas.",
            },
        ]

        created_count = 0
        skipped_count = 0

        for index, user in enumerate(Users.objects.all()):
            profile_data = sample_profiles[index % len(sample_profiles)].copy()
            profile_data["nickname"] = user.name

            _, created = Profiles.objects.get_or_create(
                user=user,
                defaults=profile_data,
            )

            if created:
                created_count += 1
            else:
                skipped_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Seed profiles complete - {created_count} profiles created, "
                f"{skipped_count} users already had profiles"
            )
        )
