var ParentContainer = React.createClass({

    getInitialState	: function() {
        return {
                comments : [
                    'I pledge not to be abusive in my comments!'
                ]
        };
    },
    eachComment	: function(text, i) {
        return (
                <CommentComponent key={i} index={i} removeComment={this.removeComment} updateComment={this.updateComment}>
                        {text}</CommentComponent>
                );
    },

    removeComment : function(index) {
        console.log('About to remove comment '+(index+1));
        var cmntArr = this.state.comments;
        cmntArr.splice(index,1);
        this.setState({comments : cmntArr});
    },

    updateComment : function(index, newText) {
        console.log('About to update comment '+(index+1));
        var cmntArr = this.state.comments;
        cmntArr[index] = newText;
        this.setState({comments : cmntArr});
    },

    addComment : function(defaultText) {
        var cmntArr = this.state.comments;
        cmntArr.push(defaultText);
        this.setState({comments : cmntArr});
    },

    render	: function() {
        return (
                <div>
                    <img src="./resources/images/logo11_big.png" className="logo" alt="Techvestor" />
                    <br/><br/>
                    <NewsContainer />
                    <hr/>
                    <button className="btn btn-primary" onClick={this.addComment.bind(null,'New Comment')}>Add Comment</button>
                    {this.state.comments.map(this.eachComment)}
                </div>
                );
    }
});
var CommentComponent = React.createClass({

    getInitialState	: function() {
        return {editMode : false};
    },

    render	: function() {

        if(this.state.editMode)
            return this.renderEditMode();
        else
            return this.renderNormalMode();
    },

    renderNormalMode : function() {

        return (
            <div className="hero">
                <p align="center">{this.props.children}</p>
                <button onClick={this.onEditClick} className="btn btn-warning">Edit</button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={this.onRemoveClick} className="btn btn-danger">Remove</button>
                <hr/>
            </div>
        );
    },

    renderEditMode : function() {

        return (
            <div className="hero">
                <textarea ref="newText" defaultValue={this.props.children}></textarea><br/>
                <button onClick={this.onSaveClick} className="btn btn-success">Save</button>
                <hr/>
            </div>
        );
    },

    onEditClick	: function() {
        console.log("Edit button clicked!");
        this.setState({editMode:true});
    },

    onRemoveClick	: function() {
        console.log("Remove button clicked!");
        this.props.removeComment(this.props.index);

    },

    onSaveClick	: function() {
        console.log("Save button clicked!");
        console.log('Entered text is : '+this.refs.newText.value);
        this.setState({editMode:false});
        this.props.updateComment(this.props.index, this.refs.newText.value);
    }
});

var NewsContainer = React.createClass({

    getInitialState : function() {
       return {newsData: "ABC"};
    },

    componentDidMount() {
        const params = new URLSearchParams(window.location.search)
        const newsType = params.has('newsTopic') ? params.get('newsTopic') : 'breaking-news';
        fetch("/top-headlines?newsTopic="+newsType)
          .then( res => res.json())
          .then(
            (data) => {
              this.setState({
                newsData: data
              });
            },
            (error) => {
              console.log(error)
            }
          );
    },

    eachArticle: function(article, i) {
        return(
            <div key={i} className="col-sm-10 col-xs-10 col-md-6 col-lg-4">
                <span><h5>{article.title}</h5> </span>
                <br/>
                <img className ="img-fluid" src={article.image} />
                <br/>
                <p className="lead">{article.content}</p>
                <span><a href={article.url}> <b>Continue on {article.source.name}</b></a></span>
                <br/>
            </div>
        );
    },

    render: function() {
        if (this.state.newsData === "ABC")
            return (<div className="loader"></div>);
        else
            return (<div className="row">
                        {this.state.newsData.articles.map(this.eachArticle)}
                        <br/>
                    </div>);
    }
});
ReactDOM.render(<ParentContainer/>, document.getElementById('newsApp'));