# Python

import tensorflowjs as tfjs
import keras
import os

def train():
    path = os.path.join(os.getcwd(), 'final_model.h5')
    model = keras.models.load_model(path)
    tfjs.converters.save_keras_model(model, 'rebelcropJS')

if __name__ == '__main__':
    train()
    print('Done')