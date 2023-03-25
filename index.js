const request=require("request");
const cheerio=require("cheerio");
const jsonfile=require("jsonfile");
let jsonarr=[];
request("https://www.github.com/trending",handleRequestdata);
function handleRequestdata(err,data){

    if(!err){
        //console.log(data.body);
        let $=cheerio.load(data.body);
        $(".Box-row").each(function(i,el){
           let title=$(el).find(".h3>a").text().trim();
           let description=$(el).find('p').text().trim();
           let url=$(el).find(".h3>a").attr("href");
           let stars=$(el).find(".f6>span+a").text().trim();
           let forks=$(el).find(".f6>span+a+a").text().trim();
           let language=$(el).find(".f6>span>span").text().trim();
           /*let datas={};
           datas.title=title;
           datas.description=description;
           datas.url=url;
           datas.stars=stars;
           datas.forks=forks;
           datas.language=language;
           jsonfile.writeFile('data.json',datas);*/
           jsonarr.push({title,description,url,stars,forks,language});
           jsonfile.writeFile('data.json',jsonarr);
          
           

        })

    }else{
        console.log("data not found")
    }
    console.log(jsonarr)
}
