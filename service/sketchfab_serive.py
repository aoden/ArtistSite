from time import sleep
import requests
from service.base_service import BaseService

__author__ = 'khoi'

SKETCHFAB_DOMAIN = 'sketchfab.com'
SKETCHFAB_API_URL = 'https://api.{}/v2/models'.format(SKETCHFAB_DOMAIN)
SKETCHFAB_MODEL_URL = 'https://{}/models/'.format(SKETCHFAB_DOMAIN)


class SketchfabService(BaseService):
    def __init__(self):
        super().__init__()

    def get_embedded(self):
        return

    def upload(self, args):
        name = args['name']
        description = args['description']
        # tags = "3d"  # space-separated list of tags
        api_token = args['token']

        data = {
            'token': api_token,
            'name': name,
            'description': description,
            # 'tags': tags,
        }

        files = {
            'modelFile': args['file']
        }

        try:
            model_uid = self.upload(data, files)
            self.poll_processing_status(model_uid, api_token)
        except:
            print('upload failed')

    def upload(data, files):
        """
        Upload a model to sketchfab
        """
        print('Uploading ...')

        try:
            r = requests.post(SKETCHFAB_API_URL, data=data, files=files, verify=False)
        except requests.exceptions.RequestException as e:
            print("An error occured: {}".format(e))
            return

        result = r.json()

        if r.status_code != requests.codes.created:
            print("Upload failed with error: {}".format(result))
            return

        model_uid = result['uid']
        model_url = SKETCHFAB_MODEL_URL + model_uid
        print("Upload successful. Your model is being processed.")
        print("Once the processing is done, the model will be available at: {}".format(model_url))

        return model_uid

    def poll_processing_status(model_uid, api_token):
        """
        Poll the Sketchfab API to query the processing status
        :param api_token:
        """
        polling_url = "{}/{}/status?token={}".format(SKETCHFAB_API_URL, model_uid, api_token)
        max_errors = 10
        errors = 0
        retry = 0
        max_retries = 50
        retry_timeout = 5  # seconds

        print("Start polling processing status for model {}".format(model_uid))

        while (retry < max_retries) and (errors < max_errors):
            print("Try polling processing status (attempt #{}) ...".format(retry))

            try:
                r = requests.get(polling_url)
            except requests.exceptions.RequestException as e:
                print("Try failed with error {}".format(e))
                errors += 1
                retry += 1
                continue

            result = r.json()

            if r.status_code != requests.codes.ok:
                print("Upload failed with error: {}".format(result['error']))
                errors += 1
                retry += 1
                continue

            processing_status = result['processing']
            if processing_status == 'PENDING':
                print("Your model is in the processing queue. Will retry in {} seconds".format(retry_timeout))
                print("Want to skip the line? Get a pro account! https://sketchfab.com/plans")
                retry += 1
                sleep(retry_timeout)
                continue
            elif processing_status == 'PROCESSING':
                print("Your model is still being processed. Will retry in {} seconds".format(retry_timeout))
                retry += 1
                sleep(retry_timeout)
                continue
            elif processing_status == 'FAILED':
                print("Processing failed: {}".format(result['error']))
                return
            elif processing_status == 'SUCCEEDED':
                model_url = SKETCHFAB_MODEL_URL + model_uid
                print("Processing successful. Check your model here: {}".format(model_url))
                return

            retry += 1

        print("Stopped polling after too many retries or too many errors")
