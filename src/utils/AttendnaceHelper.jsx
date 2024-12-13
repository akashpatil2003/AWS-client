
export const columns = [
  {
    name: "Sl. No.",
    selector: (row) => row.slNo,
    width: "80px"
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "150px"
  },
  {
    name: "Employee ID",
    selector: (row) => row.employeeId,
    sortable: true,
    width: "150px"
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "150px"
  },
  {
    name: "Date",
    selector: (row) => row.date,
    sortable: true,
    width: "150px"
  },
  {
    name: "In Time",
    selector: (row) => row.inTime,
    center: "true"
  },
  {
    name: "Out Time",
    selector: (row) => row.outTime,
    center: "true"
  }
]