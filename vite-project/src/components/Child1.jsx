import React, { memo } from 'react'
import { Child2 } from './Child2'

export const Child1 = memo(({ count, name }) => {
    console.log("Child1 rerender");

    return (
        <div>Child1 {count} {name}
            <Child2 count={count} />
        </div>
    )
})
