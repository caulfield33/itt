type filter = {
  name: string;
  extensions: string[]
}

export interface ISaveOptions {
  title: string;
  buttonLabel: string;
  defaultPath: string,
  filters: filter[]
}
