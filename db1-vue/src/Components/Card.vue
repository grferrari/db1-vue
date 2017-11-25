<template>
	<div id="card">
		<figure class="image is-94x94">
			<a v-on:click="onClickButton" style="cursor:pointer"><img v-bind:src="img" ></a>
		</figure>
		<input type="hidden" v-bind:name="id" v-bind:id="id">
	</div>
</template>

<script type="text/javascript">
	
 module.exports = {
        
        props: ['image', 'id', 'arrayIndex'],
        data() {
        	return {
            	seen: false, //Identificar que a imagem está ativa
            	img: "../../images/back.png",
        	}
        },
        methods:{
        	turnBack() {
        		this.seen = false;
    			this.img = "../../images/back.png";
        	},
        	/*Ativa a imagem e retorna para o component Memory.vue os dados do elemento ativado*/
        	turnImage(){
        		if(this.seen != true){
        			this.seen = true;
        			this.img = this.image;

        		var data = [
        			{
	        			seen: this.seen,
	        			id: this.id,
	        			arrayIndex: this.arrayIndex
	        		}
        		];
        		this.$emit('clicked', data);
        		}
        	},
        	onClickButton(e){
        		this.turnImage();
        	}
        }        
    }
</script>