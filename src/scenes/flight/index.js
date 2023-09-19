import { Modal, Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam, mockFlightData } from "../../data/mockData";
import Header from "../../components/Header";
import FlightForm from "../form/flightform";

import React, { useContext, useState, useEffect } from "react";

// API imports
import { ApiContext } from "../../App";

const zhCNGrid = {
  // Root
  noRowsLabel: "没有数据。",
  noResultsOverlayLabel: "未找到数据。",
  // Density selector toolbar button text
  toolbarDensity: "表格密度",
  toolbarDensityLabel: "表格密度",
  toolbarDensityCompact: "紧密",
  toolbarDensityStandard: "标准",
  toolbarDensityComfortable: "稀疏",
  // Columns selector toolbar button text
  toolbarColumns: "列",
  toolbarColumnsLabel: "选择列",
  // Filters toolbar button text
  toolbarFilters: "筛选器",
  toolbarFiltersLabel: "显示筛选器",
  toolbarFiltersTooltipHide: "隐藏筛选器",
  toolbarFiltersTooltipShow: "显示筛选器",
  toolbarFiltersTooltipActive: (count) => `${count} 个筛选器`,
  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: "搜索…",
  toolbarQuickFilterLabel: "搜索",
  toolbarQuickFilterDeleteIconLabel: "清除",
  // Export selector toolbar button text
  toolbarExport: "导出",
  toolbarExportLabel: "导出",
  toolbarExportCSV: "导出至CSV",
  toolbarExportPrint: "打印",
  toolbarExportExcel: "导出至Excel",
  // Columns panel text
  columnsPanelTextFieldLabel: "搜索列",
  columnsPanelTextFieldPlaceholder: "列名",
  columnsPanelDragIconLabel: "重排序列",
  columnsPanelShowAllButton: "显示所有",
  columnsPanelHideAllButton: "隐藏所有",
  // Filter panel text
  filterPanelAddFilter: "添加筛选器",
  filterPanelRemoveAll: "清除全部",
  filterPanelDeleteIconLabel: "删除",
  filterPanelLogicOperator: "逻辑操作器",
  filterPanelOperator: "操作器",
  filterPanelOperatorAnd: "与",
  filterPanelOperatorOr: "或",
  filterPanelColumns: "列",
  filterPanelInputLabel: "值",
  filterPanelInputPlaceholder: "筛选值",
  // Filter operators text
  filterOperatorContains: "包含",
  filterOperatorEquals: "等于",
  filterOperatorStartsWith: "开始于",
  filterOperatorEndsWith: "结束于",
  filterOperatorIs: "是",
  filterOperatorNot: "不是",
  filterOperatorAfter: "在后面",
  filterOperatorOnOrAfter: "正在后面",
  filterOperatorBefore: "在前面",
  filterOperatorOnOrBefore: "正在前面",
  filterOperatorIsEmpty: "为空",
  filterOperatorIsNotEmpty: "不为空",
  filterOperatorIsAnyOf: "属于",
  // 'filterOperator=': '=',
  // 'filterOperator!=': '!=',
  // 'filterOperator>': '>',
  // 'filterOperator>=': '>=',
  // 'filterOperator<': '<',
  // 'filterOperator<=': '<=',

  // Header filter operators text
  // headerFilterOperatorContains: 'Contains',
  // headerFilterOperatorEquals: 'Equals',
  // headerFilterOperatorStartsWith: 'Starts with',
  // headerFilterOperatorEndsWith: 'Ends with',
  // headerFilterOperatorIs: 'Is',
  // headerFilterOperatorNot: 'Is not',
  // headerFilterOperatorAfter: 'Is after',
  // headerFilterOperatorOnOrAfter: 'Is on or after',
  // headerFilterOperatorBefore: 'Is before',
  // headerFilterOperatorOnOrBefore: 'Is on or before',
  // headerFilterOperatorIsEmpty: 'Is empty',
  // headerFilterOperatorIsNotEmpty: 'Is not empty',
  // headerFilterOperatorIsAnyOf: 'Is any of',
  // 'headerFilterOperator=': 'Equals',
  // 'headerFilterOperator!=': 'Not equals',
  // 'headerFilterOperator>': 'Greater than',
  // 'headerFilterOperator>=': 'Greater than or equal to',
  // 'headerFilterOperator<': 'Less than',
  // 'headerFilterOperator<=': 'Less than or equal to',

  // Filter values text
  filterValueAny: "任何",
  filterValueTrue: "真",
  filterValueFalse: "假",
  // Column menu text
  columnMenuLabel: "菜单",
  columnMenuShowColumns: "显示",
  columnMenuManageColumns: "管理列",
  columnMenuFilter: "筛选器",
  columnMenuHideColumn: "隐藏",
  columnMenuUnsort: "恢复默认",
  columnMenuSortAsc: "升序",
  columnMenuSortDesc: "降序",
  // Column header text
  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} 个筛选器` : `${count} 个筛选器`,
  columnHeaderFiltersLabel: "显示筛选器",
  columnHeaderSortIconLabel: "排序",
  // Rows selected footer text
  footerRowSelected: (count) => `共选中了${count.toLocaleString()}行`,
  // Total row amount footer text
  footerTotalRows: "所有行:",
  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} / ${totalCount.toLocaleString()}`,
  // Checkbox selection text
  checkboxSelectionHeaderName: "多选框",
  checkboxSelectionSelectAllRows: "全选行",
  checkboxSelectionUnselectAllRows: "反选所有行",
  checkboxSelectionSelectRow: "选择行",
  checkboxSelectionUnselectRow: "反选行",
  // Boolean cell text
  booleanCellTrueLabel: "真",
  booleanCellFalseLabel: "假",
  // Actions cell more text
  actionsCellMore: "更多",
  // Column pinning text
  pinToLeft: "固定到左侧",
  pinToRight: "固定到右侧",
  unpin: "取消固定",
  // Tree Data
  treeDataGroupingHeaderName: "组",
  treeDataExpand: "查看子项目",
  treeDataCollapse: "隐藏子项目",
  // Grouping columns
  groupingColumnHeaderName: "组",
  groupColumn: (name) => `用${name}分组`,
  unGroupColumn: (name) => `不再用${name}分组`,
  // Master/detail
  detailPanelToggle: "详细信息",
  expandDetailPanel: "显示",
  collapseDetailPanel: "折叠",
  // Row reordering text
  rowReorderingHeaderName: "重新排列行",
  // Aggregation
  aggregationMenuItemHeader: "集合",
  aggregationFunctionLabelSum: "总数",
  aggregationFunctionLabelAvg: "平均",
  aggregationFunctionLabelMin: "最小",
  aggregationFunctionLabelMax: "最大",
  aggregationFunctionLabelSize: "大小",
};

function formatDate(dateTimeStr) {
  const date = new Date(dateTimeStr);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatTime(dateTimeStr) {
  const date = new Date(dateTimeStr);
  const hr = date.getHours().toString().padStart(2, "0");
  const min = date.getMinutes().toString().padStart(2, "0");
  return `${hr}:${min}`;
}

function formatDateTime(timestamp) {
  const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const formattedDateTime = `${year}-${month}-${day}, ${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
}

const Flight = () => {
  const apiClient = useContext(ApiContext);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  //Flight entry modal open status
  const [open, setOpen] = useState(false);

  //Handle flight modal open & close
  const handleOpen = () => setOpen(true);
  const handleClose = (event, reason) => {
    if (reason === "backdropClick") {
      console.log(reason);
      return;
    } else {
      setOpen(false);
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // API call to retrieve flight data
  useEffect(() => {
    setLoading(true);
    apiClient.listFlights().then((data) => {
      setFlights(data.flights);
      setLoading(false);
    });
  }, []);

  console.log("flights: ", flights);

  // Delete button function to remove a data row from the datagrid
  const handleDeleteClick = (id) => () => {
    console.log(id);
    setFlights(flights.filter((flight) => flight.id !== id));
    console.log(flights);
  };

  const reloadData = () => {};

  const columns = [
    {
      field: "flightNumber",
      headerName: "航班号",
      flex: 1,
      headerAlign: "left",
      align: "left",
      minWidth: 150,
    },
    {
      field: "course",
      headerName: "航段",
      flex: 1,
      headerAlign: "left",
      align: "left",
      minWidth: 100,
      renderCell: ({ row: { origin, destination } }) => {
        return (
          <div>
            {origin}-{destination}
          </div>
        );
      },
    },
    {
      field: "departureDate",
      headerName: "出发日期",
      flex: 1,
      headerAlign: "left",
      align: "left",
      minWidth: 100,
      renderCell: ({ row: { departureTime } }) => {
        const departureDate = formatDate(departureTime);
        return <div>{departureDate}</div>;
      },
    },
    {
      field: "takeOffLandingTime",
      headerName: "起降时刻",
      flex: 1,
      headerAlign: "left",
      align: "left",
      minWidth: 100,
      renderCell: ({ row: { departureTime, arrivalTime } }) => {
        const departure = formatTime(departureTime);
        const arrival = formatTime(arrivalTime);
        return (
          <div>
            {departure}-{arrival}
          </div>
        );
      },
    },
    {
      field: "totalSeats",
      headerName: "总机数",
      flex: 1,
      headerAlign: "left",
      align: "left",
      minWidth: 100,
      renderCell: ({ row: { economyCount, businessCount } }) => {
        return (
          <div>
            {economyCount}Y/{businessCount}C
          </div>
        );
      },
    },
    {
      field: "ticketPrice",
      headerName: "票面价",
      flex: 1,
      headerAlign: "left",
      align: "left",
      minWidth: 150,
      renderCell: ({
        row: {
          economyAdultPrice,
          economyChildPrice,
          economyInfantPrice,
          businessAdultPrice,
          businessChildPrice,
          businessInfantPrice,
        },
      }) => {
        return (
          <div>
            ADULT: {economyAdultPrice}Y/{businessAdultPrice}C
            <br />
            CHILD: {economyChildPrice}Y/{businessChildPrice}C
            <br />
            INFANT: {economyInfantPrice}Y/{businessInfantPrice}C
          </div>
        );
      },
    },
    {
      field: "charterCost",
      headerName: "包机成本",
      flex: 1,
      headerAlign: "left",
      align: "left",
      minWidth: 100,
    },
    {
      field: "tax",
      headerName: "税费",
      flex: 1,
      headerAlign: "left",
      align: "left",
      minWidth: 100,
    },
    {
      field: "createdTime",
      headerName: "录入时间",
      flex: 1,
      headerAlign: "left",
      align: "left",
      minWidth: 100,
      renderCell: ({ row: { createdAt } }) => {
        const time = formatDateTime(createdAt);
        return <div>{time}</div>;
      },
    },
    {
      field: "createdBy",
      headerName: "录入人员",
      flex: 1,
      headerAlign: "left",
      align: "left",
      minWidth: 100,
    },
    {
      field: "action",
      headerName: "操作",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 100,
      sortable: false,
      renderCell: ({ row: { id } }) => {
        return (
          <div>
            <Button
              color="secondary"
              onClick={() => {
                handleOpen();
              }}
            >
              编辑
            </Button>
            <Button color="error" onClick={handleDeleteClick(id)}>
              删除
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      {/* <Button
        type="submit"
        color="secondary"
        variant="contained"
        onClick={() => console.log(flights)}
      >
        List Flight Table
      </Button> */}
      <Header title="航班管理" subtitle="航班信息管理" />
      <Button
        variant="contained"
        style={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
        }}
        onClick={handleOpen}
      >
        输入新航班yaowo
      </Button>
      <Modal
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "50em",
          margin: "0 auto",
          padding: "16px",
        }}
        open={open}
        onClose={handleClose}
      >
        <FlightForm onClose={handleClose}></FlightForm>
      </Modal>
      <Box
        m="0 0 0 0"
        height="75vh"
        width="100%"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          localeText={zhCNGrid}
          rows={flights ?? []}
          columns={columns}
          slots={{
            toolbar: GridToolbar,
          }}
          rowHeight={100}
          loading={loading}
        />
      </Box>
    </Box>
  );
};

export default Flight;
