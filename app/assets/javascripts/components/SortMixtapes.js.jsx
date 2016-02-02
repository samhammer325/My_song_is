class SortMixtapes extends React.Component{
	constructor(props){
		super(props);
		this.displayUsersMixTapes = this.displayUsersMixTapes.bind(this);
    this.state = {mixtapes: []};
    this.state = {mixtapes: [], visible: true, rangeStart: 0 };
    // this.state = {mixtapes: [], rangeStart: 0};
    this.upRange = this.upRange.bind(this);
    this.downRange = this.downRange.bind(this);
    

	}

componentDidMount(){
    // this.displayUsersMixTapes()
  }

	displayUsersMixTapes(search_terms){
    $.ajax({
      url: '/mixtapes_users_mixtapes',
      type: 'GET',
      data: { search_term: search_terms}
    }).success( data => {
      this.setState({mixtapes: data.mixtapes});
    }).error( data => {
      console.log(data);
    });
  }

  upRange(){
    oldRange = this.state.rangeStart;
    this.setState({rangeStart: oldRange + 4});
  }

  downRange(){
    oldRange = this.state.rangeStart;
    this.setState({rangeStart: oldRange - 4});
  }


  // render(){
    // debugger
    // let mixtapes = this.state.mixtapes.map( mixtape => {
    //   let key = `mixtape-${mixtape.id}`;
    //   return(<Mixtape key={key} {...mixtape} temp2={this.temp}/>);

  // refreshMix(){
  //   let self = this;
  //   $.ajax({
  //     url: "/mixtapes",
  //     type: "GET",
  //   }).success( data => {
  //     self.setState({ mixtapes: data });
  //   }).error( data => {
  //     console.log("could not refresh")    
  //   });
  // }

  
  render(){
          //debugger
    let rangeStart = [this.state.rangeStart, this.state.rangeStart + 4]
    let mixtapesShow = this.state.mixtapes.slice(rangeStart[0], rangeStart[1])
    let mixtapes = mixtapesShow.map( mixtape => {
      let key = `mixtape-${mixtape.id}`;

      return(<Mixtape key={key} displayUsersMixTapes={this.displayUsersMixTapes} current_user={this.props.current_user} displayPlayMixtape={this.props.DisplayPlayMixtape} mixtape_id={mixtape.id}{...mixtape} />);

    });

    
      return(
         <div>
           <button onClick={this.props.temp} className='btn'>Play</button>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <button onClick={this.toggleVisible}>Toggle MixTapes</button>
          <h1 className="cyan">MixTapes</h1>
          <hr />
          <button onClick={this.displayUsersMixTapes.bind(this, "all" )}>Display All Mixtapes</button>
          <hr />
          <button onClick={this.displayUsersMixTapes.bind(this, "users" )}>Display My Mixtapes</button>
          <hr />
          <button onClick={this.displayUsersMixTapes.bind(this, "highest_rated" )}>Display Highest Rated Mixtapes</button>
          <hr />
          <h3 className='center-align'>Mixtapes:</h3>
           {mixtapes}

          <div className = 'center'>

        
      
            <i className="waves-effect waves-light medium material-icons" onClick={this.downRange}>fast_rewind _</i>
            <i className="waves-effect waves-light medium material-icons" onClick={this.upRange}>fast_forward</i>
          </div>
        </div>
    )}
      
         
    

}

