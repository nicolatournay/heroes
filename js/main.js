const {createApp} = Vue;

createApp({
    data() {
        return {
            allHeroes: [],
            searchedHero: '',
            displayedHero: false,
            details: {}
        }
    },
    methods: {
        fetchHeroes() {
            const apiUrl = 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json';
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    this.allHeroes = data;
                    console.log(this.allHeroes);
                })
                .catch(error => {
                    console.error('Une erreur s\'est produite lors de la récupération des images de shiba:', error);
                });
        },
        displayHero(id) {
            this.displayedHero = true;
            for (let i = 0; i < this.allHeroes.length; i++) {
                if (this.allHeroes[i].id === id) {
                    this.details = this.allHeroes[i];
                }
            }
        },
        stopDisplay() {
            this.displayedHero = false;
        }
    },
    computed: {
        searchedHeroes() {
            if (this.searchedHero !== '') {
                return this.allHeroes.filter(hero => {
                    return hero.name.toLowerCase().startsWith(this.searchedHero.toLowerCase());
                });
            } else {
                const random = Math.floor(Math.random() * (this.allHeroes.length - 50));
                return this.allHeroes.slice(random, random + 50);
            }
        }
    },
    mounted() {
        this.fetchHeroes();
    }
}).mount('#app');