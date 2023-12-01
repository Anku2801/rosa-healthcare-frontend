import { Injectable } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import * as $ from 'jquery';
import 'multiple-select';
import { DataTableOptions } from './datatable.model';
declare var jQuery: any;

@Injectable({
  providedIn: 'root'
})

export class DataTableService {

  constructor() { }

  // Initialize Datatable
  initializeDatatable(dataTableElement: any, dtTrigger: any, resetFilter: any, columns? : any): void {
    if(typeof resetFilter != 'undefined' && resetFilter != null && resetFilter == true) {
      this.resetDataTableFilter(dataTableElement);
    }
    this.resetDataTable(dataTableElement, dtTrigger);
    this.renderDataTable(dataTableElement, columns);
  }

  resetDataTableFilter(dataTableElement: any):void {
    dataTableElement?.dtInstance?.then((dtInstance: any) => {
      dtInstance.search('').columns().search('').draw();
      // var columnFilterObj = jQuery('#' + dtInstance.table().node().id +' thead tr:eq(0)').find("select.dtColumnFilter");
      // if (typeof columnFilterObj !== 'undefined' && columnFilterObj != undefined && columnFilterObj != null &&  columnFilterObj.length > 0) {
      //   columnFilterObj.each(function(index) {
      //     if (jQuery(this).parent().find('ms-parent').length > 0) {
      //       jQuery(this).multipleSelect('uncheckAll');
      //     }
      //   })
      // }
      // jQuery('#' + dtInstance.table().node().id + ' thead tr:eq(0)').find(".dtColumnFilter").next(".ms-parent").addClass("d-none");
      // jQuery('#' + dtInstance.table().node().id + ' thead tr:eq(0)').find(".columnHeaderFilter").attr("src", "assets/img/filterheader.png");
    });
  }

  resetDataTable(dataTableElement: any, dtTrigger: any): void {
    dataTableElement?.dtInstance?.then((dtInstance: any) => {
      // $('#' + dtInstance.table().node().id + ' thead tr:eq(0)').find(".columnHeaderFilter").remove();
      // jQuery('#' + dtInstance.table().node().id + ' thead tr:eq(0)').find("select.dtColumnFilter").multipleSelect("destroy");
      // jQuery('#' + dtInstance.table().node().id + ' thead tr:eq(0)').find(".dtColumnFilter").remove();
      dtInstance?.clear();
      dtInstance?.destroy();
    });
    dtTrigger.next();
  }

  renderDataTable(dataTableElement: any, columns? : any): void {
    dataTableElement?.dtInstance?.then((dtInstance: any) => {
      var dtTableId = dtInstance.table().node().id;
      var i = 0;
      var that = this;
      dtInstance.columns()?.every(function () {
        var column = this;
        var displayClass = "";

        // Remove element if exist
        // jQuery('#'+dtTableId+' thead tr:eq(0) th:eq('+column.index()+')').find(".columnHeaderFilterSpan").remove();
        // jQuery('#'+dtTableId+' thead tr:eq(0) th:eq('+column.index()+')').find(".dtColumnFilter").remove();

        // // Dropdown css
        // jQuery('#'+dtTableId+'_wrapper').parent().css({"overflow": "inherit"});

        // if(typeof columns != 'undefined' && columns != null && !columns.includes(column.index())) {
        //   displayClass = "d-none";
        // } else {
        //   var colFilterIcon = '<span class="columnHeaderFilterSpan" idAttr="'+i+'" dtTableId="'+dtTableId+'"><img id="'+dtTableId+'_columnHeaderFilter'+i+'" dtTableId="'+dtTableId+'" idAttr="'+i+'" class="columnHeaderFilter float-end" src="assets/img/filterheader.png"/></span>';
        //   $('#'+dtTableId+' thead tr:eq(0) th:eq('+column.index()+')').append(colFilterIcon);

        //   // Set Column Width
        //   var columnWidth = $('#'+dtTableId+' thead tr:eq(0) th:eq('+column.index()+')').width();
        //   columnWidth = columnWidth + 200;
        //   $('#'+dtTableId+' thead tr:eq(0) th:eq('+column.index()+')').width(columnWidth);
        // }

        // var select = $('<select class="form-control form-control-sm d-none dtColumnFilter '+displayClass+'" id="'+dtTableId+'_dtColumnFilter'+i+'" multiple placeHolder="\uf0b0 Filter"></select>')
        // .appendTo($('#'+dtInstance.table().node().id+' thead tr:eq(0) th:eq('+column.index()+')'));

        // column.data().unique().sort().each( function (d, j) {
        //   if(d != null && d.indexOf("button") >= 0) {
        //     var buttonHTML = new DOMParser().parseFromString(d, 'text/html');
        //     select.append('option value="'+buttonHTML.body.textContent+'">'+buttonHTML.body.textContent+'</option>');
        //   } else {
        //     var tdHTML = new DOMParser().parseFromString(d, 'text/html');
        //     select.append('option value="'+tdHTML.body.textContent+'">'+tdHTML.body.textContent+'</option>');
        //   }
        // });

        if (displayClass != "d-none") {
          // that.initializeMultiSelect(jQuery('#'+dtTableId+'_dtColumnFilter'+i), column);
        }
        i++;
      });
    });
  }

  initializeMultiSelect(elementObj, column) {
    elementObj.multipleSelect({
      filter:true,
      filterPlaceholder: 'Search...',
      showClear: true,
      onCheckAll: function() {
        var dataArr = jQuery.map(elementObj.multipleSelect('getSelects'), function(value, key) {
          return value ? '^' + jQuery.fn.dataTable.util.escapeRegex(value)+ '$' : null;
        });

        if(dataArr.length == 0) {
          dataArr = [''];
          elementObj.parent().find("columnHeaderFilter").attr("src", "assets/img/filterheader.png");
        } else {
          elementObj.parent().find("columnHeaderFilter").attr("src", "assets/img/filterheader-selected.png");
        }

        var val = dataArr.join('|');
        column.search(val ? val : '', true, false).draw();
      },
      onUncheckAll: function () {
        var dataArr = jQuery.map(elementObj.multipleSelect('getSelects'), function(value, key) {
          return value ? '^' + jQuery.fn.dataTable.util.escapeRegex(value)+ '$' : null;
        });

        if(dataArr.length == 0) {
          dataArr = [''];
          elementObj.parent().find("columnHeaderFilter").attr("src", "assets/img/filterheader.png");
        } else {
          elementObj.parent().find("columnHeaderFilter").attr("src", "assets/img/filterheader-selected.png");
        }
        var val = dataArr.join('|');
        column.search(val ? val : '', true, false).draw();
      },
      OnClick: function(view) {
        var dataArr = jQuery.map(elementObj.multipleSelect('getSelects'), function(value, key) {
          return value ? '^' + jQuery.fn.dataTable.util.escapeRegex(value)+ '$' : null;
        });

        if(dataArr.length == 0) {
          dataArr = [''];
          elementObj.parent().find("columnHeaderFilter").attr("src", "assets/img/filterheader.png");
        } else {
          elementObj.parent().find("columnHeaderFilter").attr("src", "assets/img/filterheader-selected.png");
        }
        var val = dataArr.join('|');
        column.search(val ? val : '', true, false).draw();
      }
    });

    jQuery('.columnHeaderFilterSpan').on('click', function (event) {
      var i = jQuery(this).attr("idAttr");
      var dtTableId = jQuery(this).attr("dtTableId");
      var selectId = '#'+dtTableId+'_dtColumnFilter'+i;
      jQuery(selectId).removeClass("d-none");
      jQuery(selectId).next(".ms-parent").removeClass("d-none");
      jQuery(selectId).multipleSelect('refresh');
      event.stopPropagation();
    });

    jQuery('th').on('click', '.dtColumnFilter > *', function(e){
      e.stopPropagation();
    });

    jQuery(document).on("click", function (event) {
      var container = jQuery(".dtColumnFilter");
      if(!container.is(event.target) && container.has(event.target).length == 0) {
        jQuery(".dtColumnFilter").addClass("d-none");
      }
    });
  }

  // With Excel
  getDataTableOptionsWithFilter(dataTableObj: DataTableOptions) {
    let dateForFileName = new Date();
    let that = this;
    let dtOptions = {
      pagingType: 'full_numbers',
      paging: true,
      lengthMenu : [5, 10, 25, 50],
      processing: true,
      order: [],
      stateSave: dataTableObj.stateSave,
      language: {
        search: "Search All:"
      },
      dom: "<'row'<'col-sm-4'l><'col-sm-4 text-end'f><'col-sm-4'B>>"+
           "<'row'<'col-sm-12'tr>>"+
           "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
      buttons:[
        {
          text: 'Clear All',
          key: '1',
          className: "btn btn-sm me-4 btn-dt-clear",
          action: () => { that.resetDataTableFilter(dataTableObj.dataTableElement); }
        },
        {
          extend: "excelHtml5",
          text: 'Export to Excel',
          className: "btn btn-sm float-end",
          title: dataTableObj.exportTitle,
          filename: dataTableObj.exportFileName + '_' + dateForFileName.getTime(),
          exportOptions: {
            format: {
              header: function(text, index, node) {
                if($(node).is("th")) {
                  let thHtml = jQuery(node).html();
                  if (!thHtml.search("<span>")) {
                    text = thHtml.substring(0, thHtml.indexOf("<span>"));
                  } 
                  var innerHTML = new DOMParser().parseFromString(text, 'text/html');
                  text = innerHTML.body.textContent;
                }
                return text;
              },
              body: function(data, row, column, node) {
                if(typeof $(node).data('export') !== 'undefined') {
                  data = $(node).data('export');
                } else if($(node).html != null){
                  var buttonHTML = new DOMParser().parseFromString($(node).html(), 'text/html');
                  data = buttonHTML.body.textContent;
                }
                return data;
              }
            }
          }
        }
      ],
      stateLoaded: function stateLoadedCallback(settings, state) {
        // that.setSelectedValues(settings, state, dataTableObj.dataTableElement);
      }
    };

    if (dataTableObj.order!= undefined && dataTableObj.order != null) {
      dtOptions['order'] = dataTableObj.order;
    }

    if (dataTableObj.columnDefs!= undefined && dataTableObj.columnDefs != null) {
      dtOptions['columnDefs'] = dataTableObj.columnDefs;
    }

    if (dataTableObj.exportColumns!= undefined && dataTableObj.exportColumns != null) {
      // let exportButton = dtOptions.buttons[1];
      // let exportOptions = exportButton.exportOptions;
      dtOptions['columns'] = dataTableObj.exportColumns;
    }

    return dtOptions;
  }

  // Without Excel
  getDataTableOptionsWithoutExcel(dataTableObj: DataTableOptions) {
    // let dateForFileName = new Date();
    let that = this;
    let dtOptions = {
      pagingType: 'full_numbers',
      paging: true,
      lengthMenu : [5, 10, 25, 50],
      processing: true,
      order: [],
      // stateSave: dataTableObj.stateSave,
      language: {
        search: "Search All:"
      },
      dom: "<'row'<'col-sm-4'l><'col-sm-6 text-end'f><'col-sm-2'B>>"+
            "<'row'<'col-sm-12'tr>>"+
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
      buttons:[
        // {
        //   text: 'Clear All',
        //   key: '1',
        //   className: "btn btn-sm me-4 btn-dt-clear",
        //   action: () => { that.resetDataTableFilter(dataTableObj.dataTableElement); }
        // }
      ],
      stateLoaded: function stateLoadedCallback(settings, state) {
        // that.setSelectedValues(settings, state, dataTableObj.dataTableElement);
      }
    };

    if (dataTableObj.order!= undefined && dataTableObj.order != null) {
      dtOptions['order'] = dataTableObj.order;
    }

    if (dataTableObj.columnDefs!= undefined && dataTableObj.columnDefs != null) {
      dtOptions['columnDefs'] = dataTableObj.columnDefs;
    }

    if (dataTableObj.exportColumns!= undefined && dataTableObj.exportColumns != null) {
      // let exportButton = dtOptions.buttons[1];
      // let exportOptions = exportButton.exportOptions;
      dtOptions['columns'] = dataTableObj.exportColumns;
    }

    return dtOptions;
  }
}

