import React from 'react';
import ReactDOM from 'react-dom';
import './less/index.less'
var TodoBox = React.createClass({
    getInitialState: function() {
        return {
            listObj:[
                {'id':1,'task':'吃饭','complete':false},
                {'id':2,'task':'睡觉','complete':false}
            ]
        };
    },
    //新增一项任务
    handleSubmit: function(task) {
        // debugger;
        var data = this.state.listObj;
        console.log(data);
        var id = this.generated();
        var complete = false;
        data = data.concat([{
            "id": id,
            "task": task,
            "complete" : complete
        }]);
        console.log(data);
        this.setState({listObj:data});
    },
    //给新增任务新加一个id
    generated: function() {
        return Math.floor(Math.random() * 9000) + 1000;
    },
    //完成一项任务
    handleToggleComplete: function(taskId) {
        var data = this.state.listObj;   
        for(var i = 0,len = data.length; i < len; i++){
            if(data[i].id === taskId){
               data[i].complete = data[i].complete === true ? false : true;
               break;
            }
        }
        this.setState({listObj:data});
    },
    //删除一项任务
    handleTaskDelete: function(taskId) {
        var data = this.state.listObj;
        data = data.filter(function(item) {
             if(item.id != taskId) {
                 return item;
             }
         });
        //  console.log(data);
         this.setState({listObj:data});
    },
    render: function() {
        // console.log(this.state);
        //统计一下数量
        var statistics = {
            todoCount: this.state.listObj.length|| 0,
            todoCompleteCount : this.state.listObj.filter(function(item) {
                return item.complete === true
            }).length
        };
        return(
            <div>
                <h1 className="title">React ToDo</h1>
                <TodoList 
                    data = {this.state.listObj}
                    toggleComplete = {this.handleToggleComplete}
                    taskDelete = {this.handleTaskDelete}
                    todoCount = {statistics.todoCount}
                    todoCompleteCount = {statistics.todoCompleteCount}
                />
                <TodoForm submitTask = {this.handleSubmit}/>
            </div>
        )
    }
});
var TodoList = React.createClass({
    render: function(){
        var _that = this;
       var taskList = this.props.data.map(function(listItem) {
        return (
            <TodoItem 
                taskId={listItem.id}
                key={listItem.id}
                task={listItem.task}
                complete={listItem.complete}
                toggleComplete={_that.props.toggleComplete}
                taskDelete={_that.props.taskDelete}
            />)
        });
        return (
            <div>
                 <ul>
                    {taskList}
                    <TodoFoot 
                        todoCount = {_that.props.todoCount}
                        todoCompleteCount = {_that.props.todoCompleteCount}
                    />
                </ul>
            </div>
        );
    }
});

var TodoItem = React.createClass({
    toggleComplete: function() {
        // console.log(this.props.taskId);
        this.props.toggleComplete(this.props.taskId);
    },
    taskDelete: function() {
        // event.stopPropagation();
        // event.preventDefault();
        this.props.taskDelete(this.props.taskId);
    },
    //鼠标移入显示删除按钮
    handleMouseOver: function() {
        ReactDOM.findDOMNode(this.refs.deleteBtn).style.display = "block";
    },
    handleMouseOut: function() {
        ReactDOM.findDOMNode(this.refs.deleteBtn).style.display = "none";
    },
    //鼠标移出隐藏删除按钮
    render: function() {
        var task = this.props.task;
        var itemChecked;
        var classes = '';
        if(this.props.complete === true){
            task = <s>{task}</s>;
            classes += 'completed'
            itemChecked = true;
        }else{
            itemChecked = false;
        }
        return (
            <li className={classes}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}>
                <input type="checkbox" checked={itemChecked} onChange={this.toggleComplete}/>
                <span>{task}</span>
                <div className="delete"><button  onClick={this.taskDelete} ref="deleteBtn">删除</button></div>
            </li>
        )
    }
});
var TodoFoot = React.createClass({
    render: function() {
        return <li>已完成 {this.props.todoCompleteCount} / {this.props.todoCount} 总数</li>
    }
});
var TodoForm = React.createClass({
    //获取task
    submitTask: function(e) {
        e.preventDefault();
        var data = ReactDOM.findDOMNode(this.refs.addTask).value.trim();
        if(!data){
            return;
        }
        this.props.submitTask(data);
        // ReactDOM.findDOMNode(this.refs.task).value = "";
    },
    render: function() {
        return(
            <form onSubmit={this.submitTask}>
                <div className="pull-right add">
                    <label>Task</label>
                    <input type="text" className="add-task" ref="addTask" placeholder="你想做点什么"/>
                </div>
                <div className="pull-right">
                    <input type="submit" value = "保存" className="add-submit" />
                </div>
            </form>
        );
    }
});
ReactDOM.render(
    <TodoBox/>,
    document.getElementById('todoBox')
);


