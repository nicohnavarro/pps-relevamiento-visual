import { Component, OnInit } from '@angular/core';
import { ImagenService } from '../../services/imagen.service';
import { Imagen } from '../../classes/imagen.class';
import { AlertController, ToastController } from '@ionic/angular';
import { IImage } from '../../interfaces/IImage';
@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
})
export class CosasLindasPage implements OnInit {
  megustaActivado: boolean;
  imagenes: IImage[];
  mensaje: string;
  miImage: Imagen = new Imagen();
  megusta: boolean;

  usuario = JSON.parse(localStorage.getItem('usuario'));

  constructor(private imgService: ImagenService, private alertController: AlertController,public toastController: ToastController) { }

  ngOnInit() {
    // this.imgService.getImagenes().subscribe(res =>{
    //   this.imagenes = res;
    //   this.imagenes.forEach(imagen => {
    //     imagen.megusta=false;
    //     this.verificarVoto(imagen);
    //   });
    //   console.log(res);
    // });
    this.getTodasImagenes();
    
  }

  async presentToast(msg:string,color:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: color
    });
    toast.present();
  }

  getTodasImagenes(){
    this.imgService.getImagenesByTipo('linda').subscribe(res => {
      this.imagenes = res.filter(res => {
        return res.tipo == 'linda';
      }).sort((a: IImage, b: IImage) => {
        return +new Date(b.fecha) - +new Date(a.fecha);
      });
      this.imagenes.forEach(image => {
        if (image.votos.includes(this.usuario.id)) {
          console.log("foreachVotos");
          image.megusta = true;
          this.megusta = false;
        }
        else {
          image.megusta = false;
          this.megusta = false;
        }
      });
    });

  }

  private subirFoto(imageData) {
    let image = {} as IImage;
    image.tipo = 'linda';
    image.user = this.usuario.id;
    image.usermail = this.usuario.correo;
    image.votos = [];
    image.fecha = new Date().toLocaleString();
    image.image = 'data:image/jpg;base64,' + imageData;
    image.key = "nose";

    this.imgService
      .addImagen(image)
      .then(async () => {
        console.log('bien');
        console.log(this.imagenes);
      })
      .catch(async err => {
        console.log(err);
      })
  }

  // uploadImage(){
  //   let image= {} as IImage;
  //   image.id='22';
  //   image.key='Funciona';
  //   this.imgService.addImage(image);

  // }

  verificarVoto(imagen: IImage) {
    if (imagen.votos.includes(this.usuario.id))
      imagen.megusta = true;
    else
      imagen.megusta = false;
  }

  tomarFoto() {
    console.log('tomar foto');
    this.imgService
      .takePhoto()
      .then(async imageData => {
        this.subirFoto(imageData);
        this.presentToast('Foto Subida con exito.','success');
      }, err => {
        console.log(err);
      });
  }

  elegirFoto() {
    console.log('ok elegir');
    this.imgService.choosePhoto().then(async imageData =>{
      this.subirFoto(imageData);
      this.presentToast('Foto Subida con exito!','success')
    },err => {
      alert(err);
    })
  }

  private puedoVotar(imagen: IImage) {
    if (imagen.usermail === this.usuario.correo) {
      console.log('No puedes votar tu propia foto');
      this.presentToast('No puedes votar tu propia foto','danger');
      return false;
    }
    else{
      return true;
    }
  }

  votarFoto(image) {
    if (this.puedoVotar(image) && !image.votos.includes(this.usuario.id)) {
      console.log('voto', image);
      this.imgService.votarFoto(image, this.usuario);
      this.getTodasImagenes();
      image.megusta=true;
    }
    else if ((image.votos.includes(this.usuario.id))){
      console.log("ya votaste le sacamos el me gusta");
        this.imgService.sacarVoto(image, this.usuario);
        this.getTodasImagenes();
        image.megusta=false;
    }
  }

}
