import { useState } from "react";
import { Modal, Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar, zhCN } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Form from "../form";

import Header from "../../components/Header";

const Tickets = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = (event, reason) => {
    if (reason === "backdropClick") {
      console.log(reason);
      return;
    } else {
      setOpen(false);
    }
  };

  const zhCNGrid = {
    // Root
    noRowsLabel: '没有数据。',
    noResultsOverlayLabel: '未找到数据。',
    // Density selector toolbar button text
    toolbarDensity: '表格密度',
    toolbarDensityLabel: '表格密度',
    toolbarDensityCompact: '紧密',
    toolbarDensityStandard: '标准',
    toolbarDensityComfortable: '稀疏',
    // Columns selector toolbar button text
    toolbarColumns: '列',
    toolbarColumnsLabel: '选择列',
    // Filters toolbar button text
    toolbarFilters: '筛选器',
    toolbarFiltersLabel: '显示筛选器',
    toolbarFiltersTooltipHide: '隐藏筛选器',
    toolbarFiltersTooltipShow: '显示筛选器',
    toolbarFiltersTooltipActive: count => `${count} 个筛选器`,
    // Quick filter toolbar field
    toolbarQuickFilterPlaceholder: '搜索…',
    toolbarQuickFilterLabel: '搜索',
    toolbarQuickFilterDeleteIconLabel: '清除',
    // Export selector toolbar button text
    toolbarExport: '导出',
    toolbarExportLabel: '导出',
    toolbarExportCSV: '导出至CSV',
    toolbarExportPrint: '打印',
    toolbarExportExcel: '导出至Excel',
    // Columns panel text
    columnsPanelTextFieldLabel: '搜索列',
    columnsPanelTextFieldPlaceholder: '列名',
    columnsPanelDragIconLabel: '重排序列',
    columnsPanelShowAllButton: '显示所有',
    columnsPanelHideAllButton: '隐藏所有',
    // Filter panel text
    filterPanelAddFilter: '添加筛选器',
    filterPanelRemoveAll: '清除全部',
    filterPanelDeleteIconLabel: '删除',
    filterPanelLogicOperator: '逻辑操作器',
    filterPanelOperator: '操作器',
    filterPanelOperatorAnd: '与',
    filterPanelOperatorOr: '或',
    filterPanelColumns: '列',
    filterPanelInputLabel: '值',
    filterPanelInputPlaceholder: '筛选值',
    // Filter operators text
    filterOperatorContains: '包含',
    filterOperatorEquals: '等于',
    filterOperatorStartsWith: '开始于',
    filterOperatorEndsWith: '结束于',
    filterOperatorIs: '是',
    filterOperatorNot: '不是',
    filterOperatorAfter: '在后面',
    filterOperatorOnOrAfter: '正在后面',
    filterOperatorBefore: '在前面',
    filterOperatorOnOrBefore: '正在前面',
    filterOperatorIsEmpty: '为空',
    filterOperatorIsNotEmpty: '不为空',
    filterOperatorIsAnyOf: '属于',
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
    filterValueAny: '任何',
    filterValueTrue: '真',
    filterValueFalse: '假',
    // Column menu text
    columnMenuLabel: '菜单',
    columnMenuShowColumns: '显示',
    columnMenuManageColumns: '管理列',
    columnMenuFilter: '筛选器',
    columnMenuHideColumn: '隐藏',
    columnMenuUnsort: '恢复默认',
    columnMenuSortAsc: '升序',
    columnMenuSortDesc: '降序',
    // Column header text
    columnHeaderFiltersTooltipActive: count => count !== 1 ? `${count} 个筛选器` : `${count} 个筛选器`,
    columnHeaderFiltersLabel: '显示筛选器',
    columnHeaderSortIconLabel: '排序',
    // Rows selected footer text
    footerRowSelected: count => `共选中了${count.toLocaleString()}行`,
    // Total row amount footer text
    footerTotalRows: '所有行:',
    // Total visible row amount footer text
    footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} / ${totalCount.toLocaleString()}`,
    // Checkbox selection text
    checkboxSelectionHeaderName: '多选框',
    checkboxSelectionSelectAllRows: '全选行',
    checkboxSelectionUnselectAllRows: '反选所有行',
    checkboxSelectionSelectRow: '选择行',
    checkboxSelectionUnselectRow: '反选行',
    // Boolean cell text
    booleanCellTrueLabel: '真',
    booleanCellFalseLabel: '假',
    // Actions cell more text
    actionsCellMore: '更多',
    // Column pinning text
    pinToLeft: '固定到左侧',
    pinToRight: '固定到右侧',
    unpin: '取消固定',
    // Tree Data
    treeDataGroupingHeaderName: '组',
    treeDataExpand: '查看子项目',
    treeDataCollapse: '隐藏子项目',
    // Grouping columns
    groupingColumnHeaderName: '组',
    groupColumn: name => `用${name}分组`,
    unGroupColumn: name => `不再用${name}分组`,
    // Master/detail
    detailPanelToggle: '详细信息',
    expandDetailPanel: '显示',
    collapseDetailPanel: '折叠',
    // Row reordering text
    rowReorderingHeaderName: '重新排列行',
    // Aggregation
    aggregationMenuItemHeader: '集合',
    aggregationFunctionLabelSum: '总数',
    aggregationFunctionLabelAvg: '平均',
    aggregationFunctionLabelMin: '最小',
    aggregationFunctionLabelMax: '最大',
    aggregationFunctionLabelSize: '大小'
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "客户ID" },
    {
      field: "name",
      headerName: "全名",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "年龄",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "联系号码",
      flex: 1,
    },
    {
      field: "email",
      headerName: "电子邮箱",
      flex: 1,
    },
    {
      field: "address",
      headerName: "地址",
      flex: 1,
    },
    {
      field: "city",
      headerName: "城市",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "邮政编码",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="票务管理" subtitle="所有目前票务" />
      <Button
        variant="contained"
        style={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
        }}
        onClick={handleOpen}
      >
        输入新票务
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Form onClose={handleClose}></Form>
      </Modal>
      <Box
        m="0 0 0 0"
        height="75vh"
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
          rows={mockDataContacts}
          columns={columns}
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </Box>
    </Box>
  );
};

export default Tickets;
