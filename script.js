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
            let minWay = this.getMinRoute();
            console.log(`Route: ${minWay.route}; Price: ${minWay.price}`);
        }

        createHeaderRow() {
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
                __me.matrix[i][j] = { value: n, visitedAmount: 0 };
            });
        }

        findWay() {
            let str = '',
                price = 0,
                arr = [],
                lastVisitedAmount = 9999999;
            for (let k = this.start.index; k < this.matrix.length; k++) {
                if (this.matrix[this.start.index][k] != undefined) {
                    price = this.matrix[this.start.index][k].value;
                    for (let l = k, q = k; l < this.matrix.length; l++) {
                        for (let i = q; i < this.end.index; i++) {
                            for (let j = 0; j < this.matrix[k].length; j++) {
                                if (this.matrix[i][j] != undefined) {
                                    if (!this.isRowVisited(this.matrix[i]) && this.matrix[i][j].visitedAmount != this.getMinVisitedAmount(this.matrix[i])) {
                                        continue;
                                    }
                                    let qweasd = this.matrix[i][j];
                                    str += this.headerRow[i] + ' > ';
                                    price += this.matrix[i][j].value;
                                    this.matrix[i][j].visitedAmount += 1;
                                    i = j - 1;
                                    if (i == this.end.index && j != this.end.index) {
                                        console.log('hello');
                                        str = '';
                                        price = this.matrix[this.start.index][k].value;
                                    }
                                    break;
                                }
                            }
                        }
                        if (str) {
                            arr.push({ route: `${this.start.label} > ${str}${this.end.label}`, price: price });
                            str = '';
                            price = this.matrix[this.start.index][k].value;
                        }
                    }
                }
            }
            this.resultArray = arr;
        }

        isRowEmpty(row) {
            row.forEach(function () {
                if (row != undefined) {
                    return false;
                }
                return true;
            });
        }
        isRowVisited(row) {
            let min = 9999999999;
            row.forEach(function (item) {
                if (item != undefined) {
                    min = (min > item.visitedAmount) ? item.visitedAmount : min;
                }
            });
            for (let i = 0; i < row.length; i++) {
                if (row[i] != undefined && row[i].visitedAmount != min) {
                    return false;
                }
            }
            return true;
        }
        getMinVisitedAmount(row) {//возращает максимальный
            let min = 9999999999;
            row.forEach(function (item) {
                if (item != undefined) {
                    min = (min > item.visitedAmount) ? item.visitedAmount : min;
                }
            });
            return min;
        }

        getMinRoute(){
            let min = this.resultArray[0].price,
            i = 0;
            this.resultArray.forEach(function(value, index){
                if(min > value.price){
                    min = value.price;
                    i = index;
                }
            });
            return this.resultArray[i];
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