import { Component } from '@angular/core';
import  {  saveAs  }  from  'file-saver' ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'framwork';
  propriedade:string = '';
  nomeClasse:string = '';
  listaPropriedades:Array<string> = [];
  listaArquivosMontada:Array<string>;


  disabledBotaoGeraClass():boolean{
  if(this.nomeClasse !== '')
  {
    if(this.listaPropriedades.length !== 0){
      return false
    }else{
      return true
    }
  }else{
    return true
  }
  }

   escreverArquivo() {

    this.listaArquivosMontada = [];
    let montaMetodoGetSet:Array<string> = [];
    montaMetodoGetSet = this.listaPropriedades;
    this.listaPropriedades.forEach((valor,index)=>{
      const ultimaPosicao = this.listaPropriedades.length;

      if(index == 0)
      {
        this.listaArquivosMontada.push("namespace");
        this.listaArquivosMontada.push("{");
        this.listaArquivosMontada.push("\n");
        this.listaArquivosMontada.push(`class name ${this.nomeClasse}`);
        this.listaArquivosMontada.push("\n");
        this.listaArquivosMontada.push("{");
        this.listaArquivosMontada.push("\n");
        this.listaArquivosMontada.push(`private string ${valor}`);
      }
      if(index !== 0 && index !== ultimaPosicao - 1)
      {
        this.listaArquivosMontada.push("\n");
        this.listaArquivosMontada.push(`private string ${valor}`);
      }
      if(index == ultimaPosicao - 1)
      {
        this.listaArquivosMontada.push("\n");
        index !==0? this.listaArquivosMontada.push(`private string ${valor}`) : '';
        this.listaArquivosMontada.push("\n");
        this.listaArquivosMontada.push("\n");
        this.listaArquivosMontada.push("\n");
        montaMetodoGetSet.forEach(getSet =>{
          this.listaArquivosMontada.push("\n");
          this.listaArquivosMontada.push(`public void set${getSet[0].toUpperCase() + getSet.substring(1)}(string _${getSet}){ ${getSet} = _${getSet};}`);

        });
        this.listaArquivosMontada.push("\n");
        montaMetodoGetSet.forEach(getSet =>{
          this.listaArquivosMontada.push("\n");
          this.listaArquivosMontada.push(`public string get${getSet[0].toUpperCase() + getSet.substring(1)}() { return ${getSet};}`);
        });
        this.listaArquivosMontada.push("\n");
        this.listaArquivosMontada.push("\n");
        this.listaArquivosMontada.push("}");
        this.listaArquivosMontada.push("\n");
        this.listaArquivosMontada.push("}");
      }
    })

   setTimeout(() => {
     let blob = new Blob(this.listaArquivosMontada,
    {
      type: "text/plain;charset=utf-8"
    })
    saveAs(blob, this.nomeClasse + ".txt");
   }, 2000);
    }

    adicionaPropriedade(){
      if(this.propriedade !== "")
      {
        if(this.listaPropriedades.find(value => this.propriedade == value) == undefined)
        this.listaPropriedades.push(this.propriedade)
      }



    }

    removerPropriedade(index){

      this.listaPropriedades.splice(index,1);
    }
}
