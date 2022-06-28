export default {
    props: ["desc"],
    template: `

    <div v-if="descLength">
        <div v-if="!readMoreActivated">
            <p>
            Description: {{desc.slice(0,100)}}...
            <a class="" v-if="!readMoreActivated" @click="activateReadMore" href="#" style="color:blue">(Read More)</a>
            </p>
        </div>
        <div v-else>
            <p>
            Description: {{desc}} 
            <a class="" v-if="readMoreActivated" @click="activateReadMore" href="#" style="color:red">(Read Less)
            </a>
            </p>
        </div>
    </div>
    <div v-else>
        <p>Description: {{desc}}</p>
    </div>
  `,
    data() {
      return {
        descLength: (this.desc.length<=100) ? false : true,
        readMoreActivated: false,
        }
    },
    methods: {
        activateReadMore(e){
            e.preventDefault()
            this.readMoreActivated = !this.readMoreActivated;
        },
    },
    computed: {},
  };
  