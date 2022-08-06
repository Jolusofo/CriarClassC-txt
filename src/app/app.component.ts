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

   escreverArquivo() {
    this.listaArquivosMontada = [];
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
        this.listaArquivosMontada.push(`public string ${valor}`);
      }
      if(index !== 0 && index !== ultimaPosicao - 1)
      {
        this.listaArquivosMontada.push("\n");
        this.listaArquivosMontada.push(`public string ${valor}`);
      }
      if(index == ultimaPosicao - 1)
      {
        this.listaArquivosMontada.push("\n");
        this.listaArquivosMontada.push(`public string ${valor}`);
        this.listaArquivosMontada.push("\n");
        this.listaArquivosMontada.push("}");
        this.listaArquivosMontada.push("\n");
        this.listaArquivosMontada.push("}");
      }
    })
    console.log(this.listaArquivosMontada)
   setTimeout(() => {
     let blob = new Blob(this.listaArquivosMontada,
    {
      type: "text/plain;charset=utf-8"
    })
    saveAs(blob, this.nomeClasse + ".txt");
   }, 3000);
    }

    adicionaPropriedade(){
      if(this.propriedade !== "")
     this.listaPropriedades.push(this.propriedade)
    }

    removerPropriedade(index){
      console.log(index)
      this.listaPropriedades.splice(index,1);
    }
}
