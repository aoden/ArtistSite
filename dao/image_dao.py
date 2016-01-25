from dao.base_dao import BaseDao

__author__ = 'aoden'


class ImageDao(BaseDao):
    def __init__(self):
        super().__init__()

    def save_2d_iamge(self, args):
        connection = self.get_connection()
        sql = "INSERT INTO image(name, type, description, data) VALUES (%s,%s,%s,%s)"
        with connection.cursor() as cursor:
            cursor.execute(sql, [args['name', 'type', 'description', 'file']])
