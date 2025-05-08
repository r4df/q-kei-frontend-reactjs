import React from "react";
import { Link } from "react-router-dom";
import ContainerType1 from "../../component/ContainerType1";

// JSON
import ProjectListJson from "./001_ProjectList.json"

function Home() {

  const getStatusIcon = (status) => {
    switch (status) {
      case "完了":
        return<span className="text-success">
          完了<i className="bi bi-check-circle-fill ms-1"></i>
        </span>
      case "進行中":
        return <span className="text-primary">
          進行中<i className="bi bi-arrow-repeat ms-1"></i>
        </span>
      case "保留中":
        return <span className="text-warning">
          保留中<i className="bi bi-pause-circle-fill ms-1"></i>
        </span>
      case "停止":
        return <span className="text-danger">
          停止<i className="bi-x-circle-fill ms-1"></i>
        </span>

      default:
        return <span className="">XXX</span>
    }
  }

  return (
    <div className="container" >
      <ContainerType1>
        <h1 className="m-0">Hello and Welcome!</h1>
      </ContainerType1>

      <ContainerType1>
        <h2>Projects</h2>
        <div className="table-responsive-xxl">
          <table className="table table-sm table-bordered">
            <caption>This are the current projects in this site.</caption>
            <thead className=" table-dark">
              <tr>
                <th>PN</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Last Update</th>
              </tr>
            </thead>
            <tbody>
              {
                ProjectListJson.map((item, index) => (
                  <tr key={index}>
                    <td>{item.PN}</td>
                    <td>
                      <Link to={item.Link} className="d-flex flex-lg-row flex-column align-items-center">
                        <img src={item.Icon} alt="icon" width={50} height={50} className="border border-1 p-1 mx-2 rounded shadow-sm" />
                        {item.Title}
                      </Link>
                    </td>
                    <td>{item.Description}</td>
                    <td>
                      {getStatusIcon(item.Status)}
                    </td>
                    <td>{item.LastUpdate}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </ContainerType1>
    </div>
  );
}
export default Home;
