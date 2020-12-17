import React, { useEffect, useReducer } from "react";
import AdminLayout from "../layouts/Admin.layout";
import {
  Button,
  makeStyles,
  MenuItem,
  OutlinedInput,
  Paper,
  Select
} from "@material-ui/core";
import { ArrowDropDown } from "@material-ui/icons";
import clsx from "clsx";
import { format } from "date-fns";
import CreateGroupModal from "../components/CreateGroupModal";
import Api from "../utils/api";
import DataTable from "../components/DataTable";
import { Link } from "react-router-dom";
import BlogActions from "../components/BlogActions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    padding: theme.spacing(3),
    height: window.innerHeight - 160,
    display: "flex",
    flexDirection: "column"
    // justifyContent: "space-between"
  },
  inputContainer: {
    margin: theme.spacing(3, 0),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  input: { height: 42 },
  searchInput: {
    width: 200,
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "40vw"
    }
  },
  stateInput: {
    width: 99,
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "40vw"
    }
  },
  lgaInput: {
    width: 162,
    marginRight: theme.spacing(2)
  },
  inputContent1: {
    display: "flex"
    // [theme.breakpoints.down("sm")]: {
    //   flexWrap: "wrap"
    // }
  }
}));

function BlogList({ token }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      status: "none",
      state: "none",
      date: ""
    }
  );

  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 180
    },
    {
      field: "created_at",
      headerName: "Date",
      width: 180,
      // type: "dateTime"
      valueFormatter: ({ value }) => {
        return format(new Date(value), "MM/dd/yyyy");
      }
    },
    {
      field: "author",
      headerName: "Author",
      width: 180,
      valueFormatter: ({ value }) => {
        return value && value.name;
      }
    },
    {
      field: "views",
      headerName: "View Count",
      headerClassName: "ageCell",
      width: 130,
      cellClassName: "ageCell"
    },
    {
      field: "is_published",
      headerName: "Status",
      headerClassName: "ageCell",
      width: 140,
      cellClassName: "ageCell",
      valueFormatter: ({ value }) => {
        return value ? "Published" : "Unpublished";
      }
    },
    {
      field: "status",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <BlogActions
          params={params}
          reloadData={loadData}
          triggerLoading={triggerLoading}
        />
      )
    }
  ];

  const triggerLoading = () => {
    setLoading(!isLoading);
  };

  const loadData = async (params) => {
    const query = params && params.length > 0 ? `?${params.join("&")}` : "";
    console.log(query);
    setLoading(true);
    await Api(token)
      .getBlog(query)
      .then((res) => {
        // console.log(res.data);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  const handleSearch = () => {
    const queryArray = [];
    inputValues.name.length > 0 && queryArray.push(`name=${inputValues.name}`);
    inputValues.status !== "none" &&
      queryArray.push(`status=${inputValues.status}`);
    inputValues.date !== "" && queryArray.push(`date=${inputValues.date}`);
    return loadData(queryArray);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInputValues({ [name]: value });
    if (name === "state") {
      setInputValues({ lga: "none" });
    }
  };

  const handleCreateModal = () => {
    setOpen(!open);
  };
  return (
    <AdminLayout route="Blog">
      <CreateGroupModal
        open={open}
        handleClose={handleCreateModal}
        reloadData={loadData}
      />
      <Paper className={classes.tableContainer}>
        <div className={classes.inputContainer}>
          <div className={classes.inputContent1}>
            <OutlinedInput
              name="name"
              placeholder="Campaign Title"
              onChange={handleChange}
              value={inputValues.name}
              className={clsx(classes.input, classes.lgaInput)}
            />
            <Select
              variant="outlined"
              name="status"
              onChange={handleChange}
              value={inputValues.status}
              className={clsx(classes.input, classes.lgaInput)}
            >
              <MenuItem value="none">Status</MenuItem>
              <MenuItem value={"1"}>Published</MenuItem>
              <MenuItem value={"0"}>Unbublished</MenuItem>
            </Select>
            <OutlinedInput
              name="date"
              type="date"
              placeholder="Date"
              value={inputValues.date}
              onChange={handleChange}
              className={clsx(classes.input, classes.stateInput)}
              endAdornment={<ArrowDropDown style={{ color: "#757575" }} />}
            />
            <Button
              variant="contained"
              style={{ width: 98, textTransform: "none" }}
              color="primary"
              className={classes.input}
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
          <Link to="/add-blog" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              style={{
                width: 135,
                textTransform: "none"
              }}
              color="primary"
              className={classes.input}
              onClick={handleCreateModal}
            >
              Add Blog
            </Button>
          </Link>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          {/* <div style={{ flexGrow: 1 }}> */}
          <DataTable
            loading={isLoading}
            rows={data}
            onSelectionChange={(items) => setSelectedItems(items.rows)}
            selecteditems={selectedItems}
            rightitems={[<Button>Delete</Button>]}
            columns={columns}
            id="id"
            pageSize={7}
            checkboxSelection={false}
          />
          {/* </div> */}
        </div>
      </Paper>
    </AdminLayout>
  );
}

const mapStateToProps = (state) => ({
  token: state.currentUser.token
});

export default connect(mapStateToProps)(BlogList);
