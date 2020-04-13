/**
 * 冒泡
 */
function bubbleSort(arr) {
  console.time('冒泡排序耗时');
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) { // 相邻元素两两对比
        const temp = arr[j + 1]; // 元素交换
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  console.timeEnd('冒泡排序耗时');
  return arr;
}

/**
 * 冒泡2
 * 设置一标志性变量pos,用于记录每趟排序中最后一次进行交换的位置。
 */
function bubbleSort2(arr) {
  console.time('冒泡排序耗时2');
  let i = arr.length - 1;
  while (i > 0) {
    let pos = 0;
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) { // 相邻元素两两对比
        const temp = arr[j + 1]; // 元素交换
        arr[j + 1] = arr[j];
        arr[j] = temp;
        pos = j;
      }
    }
    i = pos;
  }
  console.timeEnd('冒泡排序耗时2');
  return arr;
}

/**
 * 选择排序
 */
function selectionSort2(arr) {
  console.time('选择排序耗时');
  let maxIndex;
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    maxIndex = i;
    for (let j = i + 1; j < len; j++) {
      const max = arr[maxIndex];
      if (arr[j] > max) {
        maxIndex = j;
      }
    }
    const temp = arr[i];
    arr[i] = arr[maxIndex];
    arr[maxIndex] = temp;
  }
  console.timeEnd('选择排序耗时');
  return arr;
}

/**
 * 插入排序
 */
function insertionSort(arr) {
  console.time('插入排序耗时');
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    const val = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > val) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = val;
  }
  console.timeEnd('插入排序耗时');
  return arr;
}

/**
 * 插入排序，插入时候按照二分法
 */
function insertionSort2(arr) {
  console.time('插入排序耗时2');
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    const val = arr[i];
    let left = 0;
    let right = i;
    while (left <= right) {
      const mid = parseInt((left + right) / 2, 10);
      if (arr[mid] < val) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    for (let j = i - 1; j >= left; j--) {
      arr[j + 1] = arr[j];
    }
    arr[left] = val;
  }
  console.timeEnd('插入排序耗时2');
  return arr;
}

/**
 * 希尔排序
 */
function shellSort(arr) {
  console.time('希尔排序');
  // const len = arr.length;
  // let temp;
  // let gap = 1;
  // while (gap < len / 5) { // 动态定义间隔序列
  //   gap = gap * 5 + 1;
  // }
  // for (gap; gap > 0; gap = Math.floor(gap / 5)) {
  //   for (let i = gap; i < len; i++) {
  //     temp = arr[i];
  //     let j = i - gap
  //     for (; j >= 0 && arr[j] > temp; j -= gap) {
  //       arr[j + gap] = arr[j];
  //     }
  //     arr[j + gap] = temp;
  //   }
  // }
  // const arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
  const len = arr.length;
  let fraction = Math.floor(len / 2);
  for (; fraction > 0; fraction = Math.floor(fraction / 2)) {
    for (let i = fraction; i < len; i++) {
      let j = i - fraction;
      const val = arr[fraction + j];
      while (j >= 0 && arr[j] > val) {
        arr[j + fraction] = arr[j];
        j -= fraction;
      }
      arr[j + fraction] = val;
    }
  }
  console.timeEnd('希尔排序');
  return arr;
}

/**
 * 归并排序
 */
function merge(left, right) {
  const result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length) {
    result.push(left.shift());
  }

  while (right.length) {
    result.push(right.shift());
  }
  return result;
}

function mergeSort(arr) {
  const len = arr.length;
  if (len < 2) {
    return arr;
  }
  const mid = Math.floor(len / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}

/**
 * 快速排序
 */
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left > right) {
    return arr;
  }
  const val = arr[left];
  let i = left;
  let j = right;
  while (i !== j) {
    while (arr[j] >= val && i < j) {
      j--;
    }
    while (arr[i] <= val && i < j) {
      i++;
    }
    if (i < j) {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  arr[left] = arr[i];
  arr[i] = val;
  quickSort(arr, left, i - 1);
  quickSort(arr, i + 1, right);
  return arr;
}
// const arr = [];
// for (let i = 0; i < 1000; i++) {
//   arr[i] = i;
// }
// // const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
// bubbleSort(arr.slice());
// bubbleSort2(arr.slice());
