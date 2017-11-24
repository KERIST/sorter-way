var way;
(function () {

    class Way {
        constructor({ data: data, a: start, b: end }) {
            this.data = data;
            //
            this.createHeaderRow();
            this.createEmptyMatrix();
            this.fillMatrix();
            //
            this.start = { label: start, index: this.headerRow.indexOf(start) };
            this.end = { label: end, index: this.headerRow.indexOf(end) };
            //
            this.findWay();
        }

        createHeaderRow() {
            //create names of colunms
            let row = [];
            row.push(this.data[0][0]);
            data.forEach(function (value) {
                if (!~row.indexOf(value[0])) {
                    row.push(value[0]);
                }
                if (!~row.indexOf(value[1])) {
                    row.push(value[1]);
                }
            });
            this.headerRow = row;
        }

        createEmptyMatrix() {
            this.matrix = [];
            let __me = this;
            this.headerRow.forEach(function () {
                let row = new Array(__me.headerRow.length);
                __me.matrix.push(row);
            });
        }

        fillMatrix() {
            let __me = this;
            this.data.forEach(function (value) {
                let i = __me.headerRow.indexOf(value[0]),
                    j = __me.headerRow.indexOf(value[1]),
                    n = value[2] / value[3];
                __me.matrix[i][j] = n;
            });
        }

        findWay() {
            let str = '',
            price = 0;
            for (let i = this.start.index; i < this.matrix.length; i++) {
                outer: for (let j = 0; j < this.matrix[i].length; j++) {
                    if (this.matrix[i][j] != undefined && this.matrix[i][j] != 0) {
                        str += this.headerRow[j] + ' > ';
                        price += this.matrix[i][j];
                        this.matrix[i][j] = 0;
                        i = j - 1;
                        break outer;
                    }
                }
            }
            console.log(str);
            console.log(price);            
        }
    }

    let data = [['A', 'B', 160, 40],
    ['A', 'C', 120, 60],
    ['B', 'D', 210, 21],
    ['B', 'C', 100, 20],
    ['C', 'E', 300, 100],
    ['E', 'D', 200, 50],
    ['D', 'F', 110, 10]];

    way = new Way({ data: data, a: 'A', b: 'F' });

})();