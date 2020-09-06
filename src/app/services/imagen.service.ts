import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { map, take } from 'rxjs/operators';

import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { Imagen } from '../classes/imagen.class';
import { IImage } from '../interfaces/IImage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private imagenesRef: AngularFireList<Imagen>;
  imagesColeccion: AngularFirestoreCollection<IImage>;
  imagenes: Observable<IImage[]>;
  imageDoc: AngularFirestoreDocument<IImage>;


  options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.CAMERA,
    correctOrientation: true
  };

  imagePickerOptions: ImagePickerOptions = {
    quality: 50,
    outputType: 1
  };

  constructor(
    private camera: Camera,
    private imagePicker: ImagePicker,
    private db: AngularFireDatabase,
    private db2: AngularFirestore) {
    this.imagenesRef = this.db.list('imagenes');
    this.imagenesRef.snapshotChanges().subscribe(x => {
    });
    // this.imagenes = this.db2.collection('images').valueChanges(); sin el id
    this.imagesColeccion = this.db2.collection('images');
    this.imagenes = this.imagesColeccion.snapshotChanges().pipe(
      map(
        actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as IImage;
            data.id = a.payload.doc.id;
            return data;
          });
        }));
  }

  getImagenesByTipo(tipo: string) {
    //console.log(this.db2.collection('images', ref => ref.where('tipo', '==', tipo)))
    console.log('servicio');
    console.log(this.imagenes);
    return this.imagenes;
  }

  getImagenes() {
    return this.imagenes;
  }
  addImagen(image: IImage) {
    return this.imagesColeccion.add(image);
  }


  async takePhoto() {
    return this.camera.getPicture(this.options)
      .then(res => {
        return res;
      })
      .catch(error => {
        console.error(error);
        return error;
      });
  }

  async choosePhoto() {
    return this.imagePicker.getPictures(this.imagePickerOptions)
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(error => {
        console.error(error);
        return error;
      });
  }

  votarFoto(image: IImage, usuario) {
    console.log("servicio", image.id, usuario.id);
    image.votos.push(usuario.id);
    this.imageDoc = this.db2.doc(`images/${image.id}`);
    this.imageDoc.update(image);
  }

  sacarVoto(image: IImage, usuario) {
    console.log(" sacar voto", image.id, usuario.id);
    let index = image.votos.indexOf(usuario.id)
    image.votos.splice(index,1);
    this.imageDoc = this.db2.doc(`images/${image.id}`);
    this.imageDoc.update(image);
  }

  //REALTIME DATABASE
  // getImagenes(){
  //   return this.imagenesRef.snapshotChanges()
  //   .pipe(
  //     map(changes =>
  //       changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
  //     )
  //   )
  //   .pipe(
  //     map(images => {
  //       return images.sort((a, b) => {

  //         return  parseFloat(b.fecha) - parseFloat(a.fecha);
  //       });
  //     })
  //   );
  // }

  // addImagen(imagen:Imagen){
  //   console.log(imagen);
  //   return this.imagenesRef.push(imagen);
  // }

}
