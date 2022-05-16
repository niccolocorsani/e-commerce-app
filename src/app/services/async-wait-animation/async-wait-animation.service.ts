import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AsyncWaitAnimationService {

    constructor() {
    }

    async replaceWithWaitingAnimation(htmlElementId: string) {

        let idElement = document.getElementById(htmlElementId);
        let svg = document.createElement("div")
        svg.innerHTML =

            '    <div >\n' +
            '        <svg width="51px" height="50px" viewBox="0 0 51 50">\n' +
            '            <rect y="0" width="13" height="50" fill="#1fa2ff">\n' +
            '                <animate attributeName="height" values="50;10;50" begin="0s" dur="1s" repeatCount="indefinite" />\n' +
            '                <animate attributeName="y" values="0;20;0" begin="0s" dur="1s" repeatCount="indefinite" />\n' +
            '            </rect>\n' +
            '            <rect x="19" y="0" width="13" height="50" fill="#12d8fa">\n' +
            '                <animate attributeName="height" values="50;10;50" begin="0.2s" dur="1s" repeatCount="indefinite" />\n' +
            '                <animate attributeName="y" values="0;20;0" begin="0.2s" dur="1s" repeatCount="indefinite" />\n' +
            '            </rect>\n' +
            '            <rect x="38" y="0" width="13" height="50" fill="#06ffcb">\n' +
            '                <animate attributeName="height" values="50;10;50" begin="0.4s" dur="1s" repeatCount="indefinite" />\n' +
            '                <animate attributeName="y" values="0;20;0" begin="0.4s" dur="1s" repeatCount="indefinite" />\n' +
            '            </rect>\n' +
            '        </svg>\n' +
            '    </div>'

        idElement.replaceWith(svg);
        await this.delay(2000);
        svg.replaceWith(idElement);

    }


    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
