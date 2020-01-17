/* 原文地址：https://juejin.im/post/5a28aead6fb9a0450c494bc6#heading-13 */
const _methods = {
  data: {
    now: 0,
    sum: 0,
    log: '',
  },
  _nodeInit: function (mkDir) {
    this._nodeSum(mkDir);
    this._nodeFor(mkDir);
  },
  _nodeFor: function (mkDir, path) {
    const self = this;
    for (let i = 0, len = mkDir.length; i < len; i++) {
      const { name, child } = mkDir[i];
      const path_block = path ? `${path}/${name}` : name;
      if (name.lastIndexOf('.') === -1) {
        (function (path, child, name) {
          fs.mkdir(path, function (err) {
            if (err) {
              return console.error(err);
            }
            self._nodeTree(++self.data.now, path, name);
            if (child) {
              self._nodeFor(child, path);
            }
          });
        })(path_block, child, name)
      } else {
        (function (path, val, name) {
          fs.appendFile(path, val ? val : '', 'utf8', function (err) {
            if (err) {
              return console.error(err);
            }
            self._nodeTree(++self.data.now, path, name);
          });
        })(path_block, mkDir[i], name);
      }
    }
  },
  _nodeSum: function (arr) {
    console.log('\x1B[90m' + 'Downloading to' + __dirname + '\x1B[39m');
    const self = this;
    function count(mkDir, j) {
      for (let i = 0, len = mkDir.length; i < len; i++) {
        (function (mkDir, i, j) {
          const log = log_j(j);
          const name = mkDir[i].name.lastIndexOf('.') === -1 ? mkDir[i].name : ('\x1B[90m' + mkDir[i].name + '\x1B[39m');
          self.data.log += log + '--' + name + '\n';
          if (mkDir[i].child) {
            count(mkDir[i].child, ++j);
          }
          self.data.sum++;
        })(mkDir, i, j ? j : 0);
      }
    }
    function log_j (val) {
      let log = '';
      if (val === 0) return '|';
      for (let i = 0; i < val; i++) {
        log += '　' + '|';
      }
      return '|' + log;
    }
    count(arr);
    console.log('\x1B[90m' + 'Altogether contains ' + this.data.sum + 'second Execution process' + '\x1B[90m');
  },
  _nodeTree: function (now, path, name) {
    console.log('[' + now + '/' + this.data.sum + ']\x1B[90m ' + name + '\x1B[39m' + '\x1B[32m' + ' installed ' + '\x1B[39m' + 'at ' + path);
    if (now === this.data.sum) {
      console.log('\x1B[32m' + 'All package installed ' + this.data.sum + ' project installed from ' + __dirname + '\x1B[39m');
      console.log('\x1B[35m' + 'Project catalogue:' + '\x1B[39m');
      console.log(this.data.log + '------------------------------------');
    }
  }
};

const fs = require('fs');
const mkDir = [
  {
    name: 'css',
    child: [
      {
        name: 'public.css',
        val: '',
      },
      {
        name: 'asd',
        child: [
          {
            name: 'asd',
          }
        ]
      }
    ]
  }
];

_methods._nodeInit(mkDir);
