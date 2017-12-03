const urlRecent = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
const urlAllTime = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
let campersRecent = JSON.parse(JSON.stringify(getCamper(urlRecent)));
let leadersRecent = getLeader(campersRecent);
let campersAllTime = JSON.parse(JSON.stringify(getCamper(urlAllTime)));
let leadersAllTime = getLeader(campersAllTime);

function getLeader(campers) {
  let leaders = [];
  for (var i = 0; i < 100; i++) {
    leaders.push({
      id: i + 1,
      image: <img src={campers[i].img} width="25" height="25"/>,
      name: campers[i].username,
      pointsRecent: campers[i].recent,
      pointsAll: campers[i].alltime
    });
  }
  return leaders;
}

function getCamper(url) {
  let result = "";
  $.ajax({
    url: url,
    async: false,
    success: function(data) {
      result = data;
    }
  });
  return result;
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: leadersRecent
    }
  }

  handleChange() {
    this.setState({data: leadersAllTime})
    let html = $('<span id="symbol">&starf;</span>');
    $("#all>span").empty();
    $("#all").append(html);
    $("#past30>span").empty();
  }

  setDefault() {
    this.setState({data: leadersRecent});
    let html = $('<span id="symbol">&starf;</span>');
    $("#past30>span").empty();
    $("#past30").append(html);
    $("#all>span").empty();
  }

  render() {
    let rows = this.state.data.map(leader => {
      return <LeaderRow key={leader.id
} data={leader
}/>
    });
    return (<table>
      <caption>Leaderboard</caption>
      <thead id="header">
        <th>#</th>
        <th id="name">Camper Name</th>
        <th id="past30" onClick={() => this.setDefault()}>Points in past 30 days</th>
        <th id="all" onClick={() => this.handleChange()}>All time points</th>
      </thead>
      < tbody >
        {rows}
        < /tbody>
          < /table>)
  }
}
const LeaderRow = (props) => {
  return (<tr>
    <td>
      {props.data.id}
   </td>
   <td>
     {props.data.image}{props.data.name}
   </td>
   <td>
     {props.data.pointsRecent}
   </td>
   <td>
     {props.data.pointsAll}
   </td>
   </tr>);
}

ReactDOM.render( < App / > , document.getElementById('container'));
