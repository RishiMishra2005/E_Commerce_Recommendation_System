import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  ngOnInit(): void {
    this.loadScript('https://cdn.botpress.cloud/webchat/v2.2/inject.js')
      .then(() => {
        console.log('BotPress Webchat loaded.');
        return this.loadScript('https://files.bpcontent.cloud/2024/10/28/15/20241028155622-AVYBNMZE.js');
      })
      .then(() => console.log('Custom BotPress script loaded.'))
      .catch(err => console.error('Error loading script:', err));
  }

  loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve(); // Script already exists
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(`Failed to load script: ${src}`);
      document.body.appendChild(script);
    });
  }
}
