import Note  from "../models/Notes";
export const renderNoteForm=(req,res)=>{
    res.render('notes/new-note');
}
export const createNewNote= async(req,res)=>{
    const {title,description}=req.body;
    const errors=[];
    if(!title){
        errors.push({text: 'Please, write something,'})
    };
    if(!description){
        errors.push({text: "Please, Write a description"});
    };
    if(errors.length>0){
        res.render('notes/new-note', {errors,title,description})
    }else{
        const newNote=new Note({title,description});
        newNote.user=req.user.id;
        await newNote.save();
        req.flash('success_msg', 'Note added successfully');
        res.redirect('notes');
    }
};
export const renderNotes= async(req,res)=>{
    const notes=await Note.find(
        {user:req.user.id}
    ).sort({date:'desc'}).lean();
    res.render('notes/all-notes',{notes});
}
export const renderEditForm=async(req,res)=>{
    const note = await Note.findById(req.params.id).lean();
    if(note.user!=req.user.id){
        req.flash('error_msg', 'Not Authorized');
        return res.redirect('/notes')
    }
    res.render('notes/edit-note',{note});
}
export const updateNote= async (req,res)=>{
    const {title, description}=req.body;
    await Note.findByIdAndUpdate(
        req.params.id, {title,description}
    );
    req.flash(
        'success_msg', 'Note Update Successfully'
    );
    res.redirect('/notes');
}
export const deleteNote= async (req,res)=>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('succes_msg', 'Note Deleted Successfully');
    res.redirect('/notes')
}