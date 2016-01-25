from dao.image_dao import ImageDao
from service.base_service import BaseService
from service.sketchfab_serive import SketchfabService
# import upload_sketchfab

__author__ = 'INSPIRON'


class ImageService(BaseService):
    def __init__(self):
        super().__init__()

    def save_2d_image(self, args):
        # upload_sketchfab.YOUR_API_TOKEN = ''
        ImageDao.save_2d_iamge(self, args)

    def save_3d_image(self, args):
        SketchfabService.upload_image(args)
