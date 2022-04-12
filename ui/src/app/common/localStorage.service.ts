import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class localStorageDataService {

    public secrateKey = environment.secrateKey;
    public encryptedMessage: any;
    public decryptedMessage: any;
    encrypt(data) {
        //  console.log("encrypt call")
        return this.encryptedMessage = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(JSON.stringify(data)), this.secrateKey);
        // console.log("encryptedMessage", this.encryptedMessage)
    }

    decrypt(data?) {
        // console.log("decrypt call")
        this.decryptedMessage = CryptoJS.AES.decrypt(data, this.secrateKey).toString(CryptoJS.enc.Utf8);
        return JSON.parse(this.decryptedMessage);
        // console.log("decryptedMessage::)", this.decryptedMessage)
    }
}