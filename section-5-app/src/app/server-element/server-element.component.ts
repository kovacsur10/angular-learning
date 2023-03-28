import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, DoCheck, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewChecked, AfterViewInit, OnDestroy {
  //@Input('srvElement') element: {type: string, name: string, content: string};
  @Input() name: string;
  @ViewChild('heading', {static: true}) header: ElementRef;
  @ContentChild('contentParagraph', {static: true}) paragraph: ElementRef;

  constructor() {
    console.log("constructor called!");
  }

  ngOnInit(): void {
    console.log("onInit called!")
    console.log("Text content: " + this.header.nativeElement.textContent);
    console.log("Text content of paragraph: " + this.paragraph.nativeElement.textContent);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("onChanges called!")
  }

  ngDoCheck(): void {
    console.log("doCheck called!")
  }

  ngAfterContentInit(): void {
    console.log("afterContentInit called!")
    console.log("Text content of paragraph: " + this.paragraph.nativeElement.textContent);
  }

  ngAfterContentChecked(): void {
    console.log("afterContentChecked called!")
  }

  ngAfterViewChecked(): void {
    console.log("afterViewChecked called!")
  }

  ngAfterViewInit(): void {
    console.log("afterViewInit called!")
    console.log("Text content: " + this.header.nativeElement.textContent);
  }

  ngOnDestroy(): void {
    console.log("onDestroy called!")
  }
}
