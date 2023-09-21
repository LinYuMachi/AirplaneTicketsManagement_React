import {CircularProgress, MenuItem, Select} from "@mui/material";


/**
 * A wrapper of the MUI <Select /> so don't need to write the <MenuItem> individually
 * @param selectProps props to pass into the inner <Select />
 * @param options item need to have a type of Array<{key: String, value: any}>
 * @param loading specifies if the select is loading
 * @constructor
 */
export const DropDown = ({selectProps, options, loading = false}) => {
  return (
      <>
        {
          !!loading ?
              (<Select value={'Loading'} disabled={true}>
                <MenuItem key="Loading" value="Loading">
                  <CircularProgress size={14} thickness={5} />
                </MenuItem>
              </Select>) :
              (<Select {...selectProps} disabled={loading}>
                {
                  (options ?? []).map((item) => (
                      <MenuItem key={item?.key} value={item}>
                        {item.value}
                      </MenuItem>
                  ))
                }
              </Select>)
        }
      </>
  )
}