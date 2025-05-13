export class CreateTodoDto {

    private constructor(
        public readonly text: string,
    ){}

    static create( props: {[key:string]: any}): [string?, CreateTodoDto?]{

        if(!props?.text){
            return ['Text property is required', undefined];
        }else{
            const { text } = props;
            return [undefined, new CreateTodoDto(text)]; 

        }
    }


}