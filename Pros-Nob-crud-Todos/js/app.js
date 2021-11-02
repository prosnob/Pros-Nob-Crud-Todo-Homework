new Vue({
    el: "#app",
    data: {
        url: "http://100.24.95.78/todos-api/public/api/todos",
        todo: [],
        users: [],
        title: "",
        description: "",
        status: null,
        userId: null,
        isNotUpdate:true,
        updateId : null,
    },

    methods: {
        getTodo() {
            // let  url = "http://100.24.95.78/todos-api/public/api/todos";
            axios.get(this.url).then(res => {
                let Alldata = res.data.data;
                for(let item of Alldata){
                    this.todo.push(item);
                }
                console.log(this.todo);
            })
        },
        // Create the post 
        createPost(){

            let post = {
                title:this.title,
                description: this.description,
                status: Number(this.status),
                user_id: Number(this.userId)
            }
            console.log(post);
            axios.post(this.url,post).then(res => {
                console.log("Created");
            });
            this.title =""
            this.description = ""
            this.status = null
            this.userId = null
        
        },
        // delete post
        deletePost(post){
            console.log(post.id)
            axios.delete(this.url+"/"+post.id).then(res => {
                console.log("Deleted");
            });
        },

        // Show data on form 
        toUpdate(post){
            this.isNotUpdate = false
            this.updateId = post.id;
            console.log(post.id)
            this.title = post.title
            this.description = post.description
            this.status = 0;
            if(post.status){
                this.status = 1
            }
            this.userId = Number(post.user_id)
        },
        // update new data
        updatePost(){
            let post = {
                title:this.title,
                description: this.description,
                status: Number(this.status),
                user_id: Number(this.userId)
            }

            axios.put(this.url+"/"+this.updateId,post).then(res => {
                console.log("updated");
            });
            this.isNotUpdate = true
            this.title =""
            this.description = ""
            this.status = null
            this.userId = null
        }
    },
    mounted() {
        this.getTodo();
    },
})