const axios = require('axios');
const cheerio = require('cheerio');

const config = {
    hostname : 'https://books.toscrape.com/',
    page: 'cataloge/page-'
}

let index = 1
module.exports = class Crawler {
    
    static async collect(page){
        const { hostname } = config ;  // hostname
        const link = page == 1 ? hostname : `${hostname}${config.page}${page}.html`;
        const req = await axios.get(link); // coleta o html da pagina
        const $ = cheerio.load(req.data); // faz o eval para conseguir utilizar seletores

        /**
         * neste foreach faço um mapeamento de todas as paginas listadas na tela principal
         * podendo salvar num banco de dados os dados ou fazer download do conteudo
         */
        $('.image_container > a').map((index, result) => console.log(result.attribs.href)) 

        const pagination = $('li.next > a')[0].attribs.href;

        if(pagination != undefined){
            index = index + 1
            this.collect(index)
        }
        else return;
    }

}