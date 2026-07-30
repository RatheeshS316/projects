# from django.urls import path , include
from . import views
# pyrefly: ignore [missing-import]
from rest_framework.routers import DefaultRouter

# urlpatterns = [
#     path("",views.home,name="home"),
# ]


router = DefaultRouter()
router.register("projects" , views.ProjectViewSet ,basename="projects")

urlpatterns = router.urls