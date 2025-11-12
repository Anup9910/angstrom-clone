import React from "react";

interface textareaFieldProps{
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder? : string;
    rows ?: number;
    required ?: boolean;
}

export default function textareaFieldProps({
    label, 
    value, 
    onChange, 
    placeholder, 
    rows = 2, 
    required  

}:textareaFieldProps){
    return(
        <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">{label}</label>
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                required={required}
                        className="w-full px-3 py-2 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 outline-none resize"
            />
        </div>
    )
}