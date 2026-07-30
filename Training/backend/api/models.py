from django.db import models

# Create your models here.

class Project(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=1000, blank=True, null=True)
    status = models.CharField(max_length=25, default="NOTSTARTED")
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    assigned = models.CharField(max_length=100)
    task = models.CharField(max_length=100)

    def __str__(self):
        return self.name