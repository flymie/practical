import pyautogui
import time
import keyboard

# pyautogui.click(725.6171875, 685.83203125)
# print(f'鼠标在开始游戏位置被点击')

# time.sleep(5)
# print(f'进入游戏')

def click_loop():
    while True:
        if not keyboard.is_pressed('q'):  # 按下 'q' 键时停止
            pyautogui.click(717.6015625, 680.98828125)
            print(f'鼠标在开始游戏位置被点击')

            time.sleep(3)
            print(f'进入游戏')

            pyautogui.click(821.46484375, 68.09765625)
            time.sleep(1)
            print(f'菜单')

            pyautogui.click(690.2578125, 330.48046875)
            time.sleep(20)
            print(f'重启')
        else:
            break

            
 
time.sleep(5)
print(f'游戏界面')
click_loop()