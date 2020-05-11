import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ITag} from "../../interfaces/ITag";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

type Tags = string[][]
@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  @Output() addTangHandler: EventEmitter<ITag[]> = new EventEmitter<ITag[]>()

  validateForm: FormGroup;
  listOfControl: Array<{ id: number; tagTitle: string }> = [];
  tags: Tags = [];
  inputVisible: boolean[] = [];

  inputValue = '';
  @ViewChild('inputElement', { static: false }) inputElement: ElementRef;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    this.addField();
    this.validateForm.valueChanges.subscribe(() => this.updateTagsList() );
  }

  updateTagsList() {
    const tags: ITag[] = [];

    Object.keys(this.validateForm.value).forEach((key, index) => {
      if (this.tags[index] && this.tags[index].length !== 0 && this.validateForm.value[key] !== '') {
        tags.push({
          name: this.validateForm.value[key],
          keywords: this.tags[index]
        })
      }
    })

    this.addTangHandler.emit(tags)
  }

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }

    if (this.listOfControl.length === 0 || this.validateForm.value[`tag-${this.listOfControl[this.listOfControl.length - 1].id}`] !== null) {

      const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

      const control = { id, tagTitle: `tag-${id}`};
      const index = this.listOfControl.push(control);
      this.validateForm.addControl(this.listOfControl[index - 1].tagTitle, new FormControl(null, Validators.required));
      this.tags.push([])
      this.inputVisible.push(false)
    }
  }

  removeField(i: { id: number; tagTitle: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      this.tags.splice(index, 1);
      this.inputVisible.splice(index, 1);
      this.validateForm.removeControl(i.tagTitle);
    }

    this.updateTagsList()
  }

  handleClose(removedTag: {}): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(index): void {
    this.inputVisible[index] = true;
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(i): void {
    if (this.inputValue && this.tags[i].indexOf(this.inputValue) === -1) {
      this.tags[i] = [...this.tags[i], this.inputValue];
    }
    this.inputValue = '';
    this.inputVisible[i] = false;
    this.updateTagsList()
  }

}
