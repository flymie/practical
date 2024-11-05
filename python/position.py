import pyautogui
import time
from pynput import mouse

def on_click(x, y, button, pressed):
    if pressed:
        print(f'鼠标在 ({x}, {y}) 位置被点击')
        # 模拟在相同位置点击，可以根据需要调整坐标
        # pyautogui.click(x, y)

with mouse.Listener(on_click=on_click) as listener:
    listener.join()