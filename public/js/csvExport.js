let csvExport = {
    fileName: "data",
    columns: [],
    rows: [],
    delimiter: ',',

    setFileName: function (fileName) {
        this.fileName = fileName;
        return this;
    },

    setColumns: function (columns = []) {
        this.columns = columns;
        return this;
    },

    addRows: function (rows = []) {
        this.rows = [...rows];
        return this;
    },

    escapeCell: function (cellData) {
        if (typeof cellData === 'string') {
            return '"' + cellData.replace(/"/g, '""') + '"';
        }
        return cellData;
    },

    getRowData: function (row) {
        return row.map(this.escapeCell).join(this.delimiter); // Use this.delimiter
    },

    exportFile: function () {
        var dataArray = [];
        var _this = this;

        if (this.columns && this.columns.length > 0) {
            dataArray.push(this.getRowData(this.columns)); // Use this.columns
        }

        this.rows.forEach(function (row) {
            dataArray.push(_this.getRowData(row)); // Use _this
        });

        var csvContent = dataArray.join("\r\n");

        if (window.navigator.msSaveOrOpenBlob) {
            var blob = new Blob([csvContent]);
            window.navigator.msSaveOrOpenBlob(blob, this.fileName); // Use this.fileName
        } else {
            var charBom = "\uFEFF";
            var encodedData = encodeURIComponent(csvContent); // Fix typo here
            var content = "data:text/csv;charset=utf-8," + charBom + encodedData;
            var link = document.createElement("a");
            link.setAttribute("href", content);
            link.setAttribute("download", this.fileName); // Use this.fileName
            document.body.appendChild(link);
            link.click();
        }
    },
}
