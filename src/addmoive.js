import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

class Addmovie extends React.Component{
    
constructor(props){
        super(props)
        //to initialize var and method
        this.state={
            id:'',
            mname:'',
            mtype:'',
            mdesc:'',
            movielist:[],
            isUpdate:false,//to check update or insert
            isValidate:true,
            message:""
        }
        this.getMovieName=this.getMovieName.bind(this);//registering my own method with react class
        this.getMovieType=this.getMovieType.bind(this);
        this.getMovieDesc=this.getMovieDesc.bind(this);
        this.saveMovie=this.saveMovie.bind(this);
        this.getAll=this.getAll.bind(this);
        this.editMovie=this.editMovie.bind(this);
        this.updateMovie=this.updateMovie.bind(this);
        this.deleteConfirm=this.deleteConfirm.bind(this);
        this.resetForm=this.resetForm.bind(this);
        console.log('constructor');

    }
getMovieName(e){
    
    this.setState({mname:e.target.value})
}
getMovieType(e){
    
    this.setState({mtype:e.target.value})
}
getMovieDesc(e){
    
    this.setState({mdesc:e.target.value})
}
getAll(){
    fetch('http://localhost:8000/movie/getAll/')
    .then(result=>{return result.json()})
    .then(data=>{this.setState({movielist:data})})
    .catch(err=>console.log(err));
      //get dont need method and header content type to be set
}
saveMovie(){
    if(this.state.mname===''||this.state.mtype===''||this.state.mdesc===''){
        this.setState({
            isValidate:false,
            message:'Please fill all the details'
        });
        return;
    }
    var movie={
        name:this.state.mname,
        type:this.state.mtype,
        desc:this.state.mdesc
    }
    //using concat because push is not a callback function
    //React updates the state asynchronously (it doesn't happen instantly). So if you want to do something right after the state updates, you can pass a callback function as the second argument to setState:

    this.setState({movielist:this.state.movielist.concat(movie)})
    console.log(this.state.movielist);
    //connect API
    fetch('http://127.0.0.1:8000/movie',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify(movie)
    }).then(response=>{
        //console.log(response.json())
        return response.json();
    }).then(result=>{
        alert(result.message)
        if(result.message==='Inserted'){
            this.setState({
                isValidate:true,
                message:"Movie Saved Successfully"
            })
            this.resetForm();
            this.getAll();
        }

    }).catch(err=>console.log(err));
}
editMovie(id){
    fetch('http://localhost:8000/movie/get/'+id)
    .then(result=>{return result.json()})
    .then(data=>{
        this.setState({
        id:data[0]._id,
        mname:data[0].name,
        mtype:data[0].type,
        mdesc:data[0].desc,
        isUpdate:true
        })
    
    })
    .catch(err=>console.log(err));
}
updateMovie(){
    var movie={
        _id:this.state.id,
        name:this.state.mname,
        type:this.state.mtype,
        desc:this.state.mdesc
    }
    console.log(movie._id)
    fetch('http://localhost:8000/movie/update/'+this.state.id,{
        method:'PUT',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(movie)
    }).then(response=>{
        //console.log(response.json())
        return response.json();
    }).then(result=>{
        alert(result.message)
        if(result.message==='updated'){
            this.getAll();
        }

    }).catch(err=>console.log(err));

}
deleteConfirm(id){
this.setState({
    id:id
})
}
deleteMovie(){
    console.log();
    fetch('http://localhost:8000/movie/delete/'+this.state.id,{
        method:'DELETE',
        headers:{
            "content-type":"application/json"
        },
    })
    .then(result=>{return result.json()})
    .then(resp=>{
        //alert(resp.message)
        if(resp.message==='deleted'){
            this.resetId();
            this.getAll();
        }

    }).catch(err=>console.log(err));
}
resetForm(){
    this.setState({
        mname:"",mtype:"",mdesc:"",isUpdate:false
    })
}
resetId(){
    this.setState({
        id:''
    })
}
render(){
    console.log('render');
    return (<div>
        <hr/>

        <h1>Add Movie-{this.props.title}</h1>
        <hr/>
        <div style={{width:'20%'}}>
        <form>
            Movie Name: <input type="text" value={this.state.mname} onChange={this.getMovieName} className='form-control'/><br/><br/>
            Movie Type: <input type="text" value={this.state.mtype} onChange={this.getMovieType} className='form-control'/><br/><br/>
            Movie Desc: <input type="text" value={this.state.mdesc} onChange={this.getMovieDesc} className='form-control'/><br/><br/>
            {
                this.state.isUpdate?
                <input type="button" value="Update" onClick={this.updateMovie} className='btn btn-primary'/>:
                <input type="button" value="save" onClick={this.saveMovie} className='btn btn-primary'/>
            
            }&nbsp;
            <input type="button" value="Reset" onClick={this.resetForm} className='btn btn-secondary'/>
        </form>
        {this.state.message!==''?
            <div>
            { this.state.isValidate?
                <div className='alert alert-success'>{this.state.message}</div>
                :<div className='alert alert-danger'>{this.state.message}</div>

            }
        </div>
        :''
    }
        </div>
        {/* {5+5} 5+5 */}
        {/* <h3>{this.state.mname}</h3>
        <h3>{this.state.mtype}</h3>
        <h3>{this.state.mdesc}</h3> */}
        <div style={{float:"left"}}>
        <table className='table table-bordered table-striped'>
            <thead>
                <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Desc</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr>
            </thead> 
            
            <tbody>
                
                    {
                        this.state.movielist.map((item)=>(
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.type}</td>
                                <td>{item.desc}</td>
                                <td><button className='btn btn-primary'  onClick={()=>{this.editMovie(item._id)}}>Edit</button></td>
                                <td><button type="button" className='btn btn-danger' data-toggle="modal" data-target="#confirmModal" onClick={()=>{this.deleteConfirm(item._id)}}>Delete</button></td>
                            </tr>

                        ))
                    }
            
            </tbody>
        </table>
        </div>
        <div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        Are you sure you want to delete this?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={()=>this.resetForm}>No</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={()=>{this.deleteMovie()}}>Yes</button>
      </div>
    </div>
  </div>
</div>
    </div>);
}
componentDidMount(){
    // console.log('component did mount')
    // setTimeout(()=>{this.setState({mname:'movieabc'})},5000)
//to load default data after render
this.getAll()
}

}
export default Addmovie;
